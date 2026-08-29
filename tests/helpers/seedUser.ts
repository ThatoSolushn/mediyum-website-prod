import { getPayload } from 'payload'

import type { User } from '../../src/payload-types.js'
import config from '../../src/payload.config.js'

export const testUser: Pick<User, 'email' | 'roles'> & { password: string } = {
  email: 'dev@mediyumza.co.za',
  password: 'test',
  // Admin-panel tests need a staff role; 'customer' cannot reach /admin.
  roles: ['admin'],
}

/**
 * Seeds a test user for e2e admin tests.
 */
export async function seedTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  // Delete existing test user if any
  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })

  // Create fresh test user
  await payload.create({
    collection: 'users',
    data: testUser,
  })
}

/**
 * Cleans up test user after tests
 */
export async function cleanupTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
