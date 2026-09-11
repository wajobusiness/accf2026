import type { CollectionConfig } from 'payload';

export const CommitteeMembers: CollectionConfig = {
  slug: 'committeeMembers',
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  admin: {
    group: 'Institutional Governance',
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'committee', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'committee',
      type: 'select',
      options: [
        { label: 'Board of Directors', value: 'board' },
        { label: 'Stakeholders Leadership Committee', value: 'stakeholders' },
        { label: 'Senior Advisory Committee', value: 'advisory' },
        { label: 'Executive Management Committee', value: 'executive' },
        { label: 'Secretariat', value: 'secretariat' },
        { label: 'Industry Professional Committees', value: 'industry' },
      ],
      required: true,
    },
    {
      name: 'department',
      type: 'text',
      localized: true,
    },
    {
      name: 'photoUrl',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
