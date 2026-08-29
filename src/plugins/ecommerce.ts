import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import type { Currency } from '@payloadcms/plugin-ecommerce/types'
import type { GroupField, TabsField } from 'payload'

import {
  adminOnlyFieldAccess,
  adminOrPublishedStatus,
  isAdmin,
  isAuthenticated,
  isCustomer,
  isDocumentOwner,
} from '@/access/roles'
import { paystackAdapter } from '@/payments/paystack'

/**
 * The South African Rand.
 *
 * `decimals: 2` means every amount the plugin stores — product prices, cart
 * subtotals, order and transaction amounts — is an integer number of cents.
 * R1 299,00 is stored as 129900. This matches what Paystack expects on the
 * wire, so no conversion happens at the payment boundary.
 */
const ZAR: Currency = {
  code: 'ZAR',
  decimals: 2,
  label: 'South African Rand',
  symbol: 'R',
  symbolDisplay: 'symbol',
}

export const ecommerce = ecommercePlugin({
  access: {
    adminOnlyFieldAccess,
    adminOrPublishedStatus,
    isAdmin,
    isAuthenticated,
    isCustomer,
    isDocumentOwner,
  },
  addresses: {
    supportedCountries: [{ label: 'South Africa', value: 'ZA' }],
  },
  currencies: {
    defaultCurrency: 'ZAR',
    supportedCurrencies: [ZAR],
  },
  customers: {
    slug: 'users',
  },
  carts: true,
  inventory: true,
  orders: true,
  products: true,
  transactions: {
    // The default transactions collection carries only a billing address.
    // The shipping address has to survive the round trip to Paystack too, and
    // our own record is the only place we are willing to read it back from.
    transactionsCollectionOverride: ({ defaultCollection }) => {
      // The plugin nests `billingAddress` inside a tabs field. Find it, clone its
      // shape for the shipping address, and drop the copy into the same tab, so
      // the two address blocks can never drift apart.
      const tabs = defaultCollection.fields.find(
        (field): field is TabsField => field.type === 'tabs',
      )

      const addressTab = tabs?.tabs.find((tab) =>
        tab.fields.some((field) => 'name' in field && field.name === 'billingAddress'),
      )

      const billingAddress = addressTab?.fields.find(
        (field): field is GroupField => 'name' in field && field.name === 'billingAddress',
      )

      if (!addressTab || !billingAddress) {
        throw new Error(
          'Expected the transactions collection to nest a billingAddress group inside a tabs field.',
        )
      }

      addressTab.fields = [
        ...addressTab.fields,
        {
          ...billingAddress,
          name: 'shippingAddress',
          admin: {
            ...billingAddress.admin,
            description: 'Where this order ships, captured at checkout.',
          },
          label: 'Shipping address',
        },
      ]

      return defaultCollection
    },
  },
  payments: {
    paymentMethods: [
      paystackAdapter({
        secretKey: process.env.PAYSTACK_SECRET_KEY || '',
      }),
    ],
  },
})
