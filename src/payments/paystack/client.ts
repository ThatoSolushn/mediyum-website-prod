/**
 * Minimal Paystack REST client.
 *
 * Paystack has no maintained first-party Node SDK, and we only need four calls,
 * so we talk to the API directly rather than take on an unmaintained dependency.
 *
 * All amounts crossing this boundary are in the currency's minor unit (ZAR
 * cents), which is the same convention Payload's ecommerce plugin uses for
 * `amount` and `subtotal`. No conversion happens here on purpose.
 */

const PAYSTACK_API = 'https://api.paystack.co'

export type PaystackInitializeResponse = {
  access_code: string
  authorization_url: string
  reference: string
}

export type PaystackTransaction = {
  amount: number
  currency: string
  gateway_response?: string
  id: number
  metadata?: Record<string, unknown>
  reference: string
  status: 'abandoned' | 'failed' | 'ongoing' | 'pending' | 'reversed' | 'success'
}

type PaystackEnvelope<T> = {
  data: T
  message: string
  status: boolean
}

const request = async <T>(
  path: string,
  secretKey: string,
  init?: { body?: unknown; method?: 'GET' | 'POST' },
): Promise<T> => {
  const response = await fetch(`${PAYSTACK_API}${path}`, {
    body: init?.body ? JSON.stringify(init.body) : undefined,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    method: init?.method ?? 'GET',
  })

  // Paystack signals failure both via HTTP status and via `status: false` in an
  // otherwise-200 body, so both have to be checked.
  const json = (await response.json()) as PaystackEnvelope<T>

  if (!response.ok || !json.status) {
    throw new Error(json?.message || `Paystack request to ${path} failed (${response.status})`)
  }

  return json.data
}

export const initializeTransaction = (
  secretKey: string,
  body: {
    amount: number
    currency: string
    email: string
    metadata?: Record<string, unknown>
    reference: string
  },
): Promise<PaystackInitializeResponse> =>
  request<PaystackInitializeResponse>('/transaction/initialize', secretKey, {
    body,
    method: 'POST',
  })

export const verifyTransaction = (
  secretKey: string,
  reference: string,
): Promise<PaystackTransaction> =>
  request<PaystackTransaction>(`/transaction/verify/${encodeURIComponent(reference)}`, secretKey)
