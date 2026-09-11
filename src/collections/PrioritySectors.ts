import type { CollectionConfig } from 'payload';

export const PrioritySectors: CollectionConfig = {
  slug: 'prioritySectors',
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  admin: {
    group: 'Programs & Strategic Sectors',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'details',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'valueAdditionStrategy',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Industrial upgrading and domestic value addition roadmap',
      },
    },
    {
      name: 'bilateralMechanisms',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Bilateral implementation framework (G2G, G2B concessions, B2B joint ventures)',
      },
    },
    {
      name: 'policyAlignment',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Alignment with AfCFTA, SEZ incentives, and national industrial policies',
      },
    },
    {
      name: 'actionCommittee',
      type: 'text',
      localized: true,
      admin: {
        description: 'Assigned ACCBCF Specialized Standing Committee',
      },
    },
    {
      name: 'strategicFocus',
      type: 'array',
      admin: {
        description: 'Strategic pillars and technological focus areas',
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'keyOpportunities',
      type: 'array',
      admin: {
        description: 'Priority investment and bankable project opportunities',
      },
      fields: [
        {
          name: 'opportunity',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
};
