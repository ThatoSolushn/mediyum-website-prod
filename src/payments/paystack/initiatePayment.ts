import type { PaymentAdapter } from '@payloadcms/plugin-ecommerce/types'

// The plugin does not export these function types directly, so derive them.
type InitiatePayment = PaymentAdapter['initiatePayment']

import { randomUUID } from 'crypto'

import { initializeTransaction } from './client'

type Props = {
  secretKey: string
}

/**
 * Creates the local transaction record first, then hands Paystack a reference
 * pointing at it.
 *
 * This is deliberately the reverse of the Stripe adapter, which stashes a cart
 * snapshot in the gateway's metadata and reads it back on confirm. Paystack's
 * metadata is not a dependable place to store a cart of arbitrary size, and
 * treating the gateway as the system of record for what was ordered is fragile
 * regardless. Our own `transactions` row is the source of truth; Paystack only
 * ever tells us whether the money moved.
 */
export const initiatePayment =
  ({ secretKey }: Props): InitiatePayment =>
  async ({ data, req, transactionsSlug }) => {
    const { payload } = req

    // The plugin types this as `string`; it is always the transactions collection.
    const transactions = transactionsSlug as 'transactions'

    const { billingAddress, cart, currency, customerEmail, shippingAddress } = data
    const amount = cart?.subtotal

    if (!secretKey) {
      throw new Error('PAYSTACK_SECRET_KEY is not set.')
    }
    if (!currency) {
      throw new Error('Currency is required.')
    }
    if (!cart?.items?.length) {
      throw new Error('Cart is empty or not provided.')
    }
    if (!customerEmail || typeof customerEmail !== 'string') {
      throw new Error('A valid customer email is required to make a purchase.')
    }
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      throw new Error('A valid amount is required to initiate a payment.')
    }

    const flattenedCart = cart.items.map((item) => {
      const productID = typeof item.product === 'object' ? item.product.id : item.product
      const variantID = item.variant
        ? typeof item.variant === 'object'
          ? item.variant.id
          : item.variant
        : undefined

      // Preserve custom properties added via cartItemMatcher, as Stripe's adapter does.
      const { product: _product, variant: _variant, ...customProperties } = item

      return {
        ...customProperties,
        product: productID,
        quantity: item.quantity,
        ...(variantID ? { variant: variantID } : {}),
      }
    })

    // Our reference, not Paystack's — so the transaction row exists and is
    // findable before the customer ever reaches the payment page.
    const reference = `mz-${randomUUID()}`

    try {
      const transaction = await payload.create({
        collection: transactions,
        data: {
          ...(req.user ? { customer: req.user.id } : { customerEmail }),
          amount,
          billingAddress,
          cart: cart.id,
          currency: currency as 'ZAR',
          items: flattenedCart,
          paymentMethod: 'paystack',
          paystack: { reference },
          shippingAddress,
          status: 'pending',
        },
        req,
      })

      const paystackTransaction = await initializeTransaction(secretKey, {
        amount,
        currency,
        email: customerEmail,
        metadata: {
          cartID: String(cart.id),
          transactionID: String(transaction.id),
        },
        reference,
      })

      return {
        accessCode: paystackTransaction.access_code,
        authorizationURL: paystackTransaction.authorization_url,
        message: 'Payment initiated successfully',
        reference: paystackTransaction.reference,
      }
    } catch (error) {
      payload.logger.error({ err: error, msg: 'Error initiating payment with Paystack' })
      throw new Error(error instanceof Error ? error.message : 'Unknown error initiating payment')
    }
  }
