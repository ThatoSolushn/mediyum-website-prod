import type { CollectionConfig } from 'payload'

import { adminOnlyFieldAccess, hasRole, isAdmin, roleOptions, staffRoles } from '../../access/roles'

/**
 * One collection for both Mediyum staff and shop customers — the ecommerce
 * plugin expects a single customers collection, and `roles` is what tells them
 * apart. Only staff roles can open the admin panel.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => hasRole(user, ...staffRoles),
    create: isAdmin,
    delete: isAdmin,
    // Staff see the whole list; a customer can only ever read their own record.
    read: ({ req: { user } }) => {
      if (hasRole(user, ...staffRoles)) {
        return true
      }
      if (!user) {
        return false
      }
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (hasRole(user, 'admin')) {
        return true
      }
      if (!user) {
        return false
      }
      return { id: { equals: user.id } }
    },
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        // Without this, any user could grant themselves 'admin' by updating
        // their own record — which their own update access above permits.
        create: adminOnlyFieldAccess,
        update: adminOnlyFieldAccess,
      },
      admin: {
        description: 'Controls admin panel access and what this person can change.',
      },
      defaultValue: ['customer'],
      hasMany: true,
      options: roleOptions,
      required: true,
    },
  ],
  timestamps: true,
  versions: false,
}
