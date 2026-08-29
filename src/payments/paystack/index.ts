import type { PaymentAdapter, PaymentAdapterClient } from '@payloadcms/plugin-ecommerce/types'
import type { GroupField } from 'payload'

import { confirmOrder as confirmOrderFactory } from './confirmOrder'
import { webhooksEndpoint } from './endpoints/webhooks'
import { initiatePayment as initiatePaymentFactory } from './initiatePayment'

type Props = {
  label?: string
  secretKey: string
}

/**
 * Paystack payment adapter for the Payload ecommerce plugin.
 *
 * Paystack rather than Stripe because this store settles in ZAR to a South
 * African bank account, which Stripe does not support for local acquiring.
 * Paystack also covers the payment methods SA customers actually reach for —
 * cards, instant EFT, and SnapScan — through one integration.
 */
export const paystackAdapter = ({ label = 'Paystack', secretKey }: Props): PaymentAdapter => {
  const confirmOrder = confirmOrderFactory({ secretKey })

  const groupField: GroupField = {
    name: 'paystack',
    type: 'group',
    admin: {
      condition: (data) => data?.paymentMethod === 'paystack',
    },
    fields: [
      {
        name: 'reference',
        type: 'text',
        admin: {
          description: 'The reference used to reconcile this payment in the Paystack dashboard.',
          readOnly: true,
        },
        index: true,
        label: 'Paystack reference',
      },
    ],
  }

  return {
    name: 'paystack',
    confirmOrder,
    endpoints: [webhooksEndpoint({ confirmOrder, secretKey })],
    group: groupField,
    initiatePayment: initiatePaymentFactory({ secretKey }),
    label,
  }
}

export const paystackAdapterClient = (): PaymentAdapterClient => ({
  name: 'paystack',
  confirmOrder: true,
  initiatePayment: true,
  label: 'Card, EFT or SnapScan',
})
