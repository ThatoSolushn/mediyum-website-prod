import type { Endpoint, PayloadRequest } from 'payload'

import { createHmac, timingSafeEqual } from 'crypto'

type Props = {
  confirmOrder: ReturnType<typeof import('../confirmOrder').confirmOrder>
  secretKey: string
}

const signatureIsValid = (rawBody: string, signature: null | string, secretKey: string) => {
  if (!signature) {
    return false
  }

  const expected = createHmac('sha512', secretKey).update(rawBody).digest('hex')
  const received = Buffer.from(signature, 'utf8')
  const computed = Buffer.from(expected, 'utf8')

  // timingSafeEqual throws on length mismatch, so guard before comparing.
  return received.length === computed.length && timingSafeEqual(received, computed)
}

/**
 * Mounted at `/api/payments/paystack/webhooks`.
 *
 * The webhook is the reliable confirmation path: the customer's browser may
 * never return from the Paystack page, but the webhook still fires. It shares
 * `confirmOrder` with the browser callback, and that function is idempotent, so
 * whichever arrives first wins and the other is a no-op.
 */
export const webhooksEndpoint = ({ confirmOrder, secretKey }: Props): Endpoint => ({
  handler: async (req: PayloadRequest) => {
    const { payload } = req

    // The signature is computed over the exact bytes Paystack sent, so the raw
    // body must be read before anything parses it.
    const rawBody = await (req as unknown as Request).text()

    if (!signatureIsValid(rawBody, req.headers.get('x-paystack-signature'), secretKey)) {
      payload.logger.warn('Rejected Paystack webhook with an invalid signature')
      return Response.json({ message: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody) as {
      data?: { reference?: string }
      event?: string
    }

    if (event.event !== 'charge.success' || !event.data?.reference) {
      // Acknowledge everything else so Paystack stops retrying it.
      return Response.json({ message: 'Ignored' }, { status: 200 })
    }

    try {
      await confirmOrder({
        data: { reference: event.data.reference },
        req,
        transactionsSlug: 'transactions',
      })
    } catch (error) {
      payload.logger.error({
        err: error,
        msg: `Failed to confirm Paystack order for reference ${event.data.reference}`,
      })

      // 500 asks Paystack to retry, which is what we want for a transient failure.
      return Response.json({ message: 'Failed to confirm order' }, { status: 500 })
    }

    return Response.json({ message: 'Order confirmed' }, { status: 200 })
  },
  method: 'post',
  path: '/webhooks',
})
