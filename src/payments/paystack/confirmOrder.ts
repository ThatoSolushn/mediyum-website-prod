import type { PaymentAdapter } from '@payloadcms/plugin-ecommerce/types'

// The plugin does not export these function types directly, so derive them.
type ConfirmOrder = PaymentAdapter['confirmOrder']

import type { Transaction } from '@/payload-types'

import { verifyTransaction } from './client'

type Props = {
  secretKey: string
}

/**
 * Verifies the payment with Paystack and promotes our pending transaction into
 * a real order.
 *
 * Two things are load-bearing here:
 *
 * 1. We re-verify against Paystack rather than trusting anything the browser
 *    sends back. The client only ever supplies a reference; the amount, currency
 *    and success state all come from the verify call.
 * 2. We check that the verified amount and currency still match the transaction
 *    we created. Paystack references are not guessable, but an amount mismatch
 *    would mean something went wrong upstream and must never become an order.
 */
export const confirmOrder =
  ({ secretKey }: Props): ConfirmOrder =>
  async ({
    cartsSlug = 'carts',
    data,
    ordersSlug = 'orders',
    req,
    transactionsSlug = 'transactions',
  }) => {
    const { payload } = req

    // The plugin types these as `string`, which widens local API results to a
    // union of every collection. They are always these collections for us.
    const carts = cartsSlug as 'carts'
    const orders = ordersSlug as 'orders'
    const transactions = transactionsSlug as 'transactions'

    const reference = data.reference as string | undefined
    const customerEmail = data.customerEmail

    if (!secretKey) {
      throw new Error('PAYSTACK_SECRET_KEY is not set.')
    }
    if (!reference) {
      throw new Error('A Paystack transaction reference is required.')
    }

    try {
      const transactionsResults = await payload.find({
        collection: transactions,
        req,
        where: { 'paystack.reference': { equals: reference } },
      })

      const transaction = transactionsResults.docs[0] as Transaction | undefined

      if (!transaction) {
        throw new Error('No transaction found for the provided Paystack reference.')
      }

      // An order already exists for this reference — return it rather than
      // creating a duplicate. The customer returning to the callback URL and the
      // webhook firing are both normal, and they race.
      if (transaction.status === 'succeeded' && transaction.order) {
        const existingOrderID =
          typeof transaction.order === 'object' ? transaction.order.id : transaction.order

        return {
          message: 'Order already confirmed',
          orderID: existingOrderID,
          transactionID: transaction.id,
        }
      }

      const verified = await verifyTransaction(secretKey, reference)

      if (verified.status !== 'success') {
        await payload.update({
          id: transaction.id,
          collection: transactions,
          data: { status: 'failed' },
          req,
        })

        throw new Error(verified.gateway_response || 'Payment not completed.')
      }

      if (verified.amount !== transaction.amount) {
        throw new Error(
          `Paid amount (${verified.amount}) does not match the transaction amount (${transaction.amount}).`,
        )
      }

      if (verified.currency !== transaction.currency) {
        throw new Error(
          `Paid currency (${verified.currency}) does not match the transaction currency (${transaction.currency}).`,
        )
      }

      const order = await payload.create({
        collection: orders,
        data: {
          ...(transaction.customer
            ? { customer: transaction.customer }
            : { customerEmail: customerEmail || transaction.customerEmail }),
          amount: transaction.amount,
          currency: transaction.currency,
          items: transaction.items,
          shippingAddress: transaction.shippingAddress,
          status: 'processing',
          transactions: [transaction.id],
        },
        req,
      })

      await payload.update({
        id: transaction.id,
        collection: transactions,
        data: { order: order.id, status: 'succeeded' },
        req,
      })

      const cartID = typeof transaction.cart === 'object' ? transaction.cart?.id : transaction.cart

      if (cartID) {
        await payload.update({
          id: cartID,
          collection: carts,
          data: { purchasedAt: new Date().toISOString() },
          req,
        })
      }

      return {
        message: 'Order confirmed successfully',
        orderID: order.id,
        transactionID: transaction.id,
      }
    } catch (error) {
      payload.logger.error({ err: error, msg: 'Error confirming Paystack order' })
      throw new Error(error instanceof Error ? error.message : 'Unknown error confirming order')
    }
  }
