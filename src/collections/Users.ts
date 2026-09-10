import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'postCount', 'active', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => {
      // Allow seeding/first user or admin
      if (!req.user) return true;
      return req.user.role === 'admin';
    },
    update: ({ req }) => {
      if (!req.user) return true;
      if (req.user.role === 'admin') return true;
      return {
        id: {
          equals: req.user.id,
        },
      };
    },
    delete: ({ req }) => {
      if (!req.user) return true;
      return req.user.role === 'admin';
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Administrator (Full Access)', value: 'admin' },
        { label: 'Editor / News Correspondent', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Administrators can manage all users. Editors can write and manage news posts.',
      },
    },
    {
      name: 'designation',
      type: 'text',
      label: 'Editorial Title / Bureau Designation',
      admin: {
        placeholder: 'e.g. Senior Trade Correspondent · Abuja Secretariat Desk',
      },
    },
    {
      name: 'avatar',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      label: 'Editor Photo / Avatar',
    },
    {
      name: 'avatarUrl',
      type: 'text',
      label: 'Avatar Fallback URL',
      admin: {
        description: 'Optional direct image link if not uploading to Media library',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Editor Biography',
      admin: {
        placeholder: 'Brief editorial background and focus areas...',
      },
    },
    {
      name: 'postCount',
      type: 'number',
      defaultValue: 0,
      label: 'Total Published Posts',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Automatically calculated total published news articles by this editor.',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active Account',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
