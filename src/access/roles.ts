import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export type Role = 'admin' | 'customer' | 'editor' | 'sales'

export const roleOptions: { label: string; value: Role }[] = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Sales', value: 'sales' },
  { label: 'Customer', value: 'customer' },
]

/**
 * Staff roles can reach the admin panel. `customer` deliberately cannot — shop
 * customers and Mediyum staff share the `users` collection (the ecommerce plugin
 * expects one customer collection), so the role is what separates them.
 */
export const staffRoles: Role[] = ['admin', 'editor', 'sales']

export const hasRole = (user: null | Partial<User> | undefined, ...roles: Role[]): boolean => {
  if (!user?.roles) {
    return false
  }

  return roles.some((role) => (user.roles as Role[]).includes(role))
}

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, 'admin')

export const isStaff: Access = ({ req: { user } }) => hasRole(user, ...staffRoles)

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)

/**
 * The ecommerce plugin types `isCustomer` as FieldAccess (it uses it to
 * auto-assign the customer on address creation), not as collection Access.
 */
export const isCustomer: FieldAccess = ({ req: { user } }) =>
  Boolean(user) && !hasRole(user, ...staffRoles)

export const adminOnlyFieldAccess: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin')

/**
 * Staff see everything; everyone else sees only published documents.
 */
export const adminOrPublishedStatus: Access = ({ req: { user } }) => {
  if (hasRole(user, ...staffRoles)) {
    return true
  }

  return { _status: { equals: 'published' } }
}

/**
 * Staff reach any document; a customer reaches only the ones they own.
 *
 * Returning a `Where` rather than a boolean is what stops one customer from
 * reading another's orders, addresses or transactions by guessing an ID.
 */
export const isDocumentOwner: Access = ({ req: { user } }) => {
  if (hasRole(user, ...staffRoles)) {
    return true
  }

  if (!user) {
    return false
  }

  return { customer: { equals: user.id } }
}
