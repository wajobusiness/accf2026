import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Institutional News', value: 'Institutional News' },
        { label: 'Strategic Dialogue', value: 'Strategic Dialogue' },
        { label: 'Industry Action', value: 'Industry Action' },
        { label: 'Investment Insights', value: 'Investment Insights' },
      ],
      required: true,
    },
    {
      name: 'featuredImageUrl',
      type: 'text',
      admin: {
        description: 'URL or path to featured image',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'ACCBCF Secretariat',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      localized: true,
    },
  ],
};
