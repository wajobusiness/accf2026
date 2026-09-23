import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: '-publishedDate',
  admin: {
    group: 'News & Media',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'author', 'publishedDate', 'featured'],
    components: {
      edit: {
        beforeDocumentControls: [
          '@/components/admin/PostPublishNotification#PostPublishControlsBadge',
        ],
      },
    },
  },
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (data) {
          // Auto-generate slug if missing or empty on create or if explicitly cleared
          if (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '') {
            const rawTitle =
              typeof data.title === 'string'
                ? data.title
                : typeof data.title === 'object' && data.title !== null
                ? data.title?.en || Object.values(data.title)[0]
                : '';
            if (rawTitle && typeof rawTitle === 'string') {
              const cleaned = rawTitle
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .slice(0, 80);
              data.slug = cleaned || `news-${Date.now()}`;
            } else {
              data.slug = `news-${Date.now()}`;
            }
          } else {
            // Clean up slug if user provided one
            const cleanedSlug = data.slug
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-');
            data.slug = cleanedSlug || `news-${Date.now()}`;
          }

          // Auto-assign logged in author if not manually selected during create
          if (!data.author && req?.user?.id && operation === 'create') {
            data.author = req.user.id;
          }

          // Auto-populate excerpt from body if missing
          if (!data.excerpt && data.body) {
            if (typeof data.body === 'string') {
              data.excerpt = data.body.slice(0, 200).trim() + '...';
            } else if (typeof data.body === 'object' && data.body !== null) {
              const excerptObj: Record<string, string> = {};
              for (const [lang, text] of Object.entries(data.body)) {
                if (typeof text === 'string') {
                  excerptObj[lang] = text.slice(0, 200).trim() + '...';
                }
              }
              if (Object.keys(excerptObj).length > 0) {
                data.excerpt = excerptObj;
              }
            }
          }
        }
        return data;
      },
    ],
    beforeChange: [
      async ({ data, req }) => {
        if (data && data.featuredImage && !data.featuredImageUrl) {
          try {
            const mediaId =
              typeof data.featuredImage === 'object' ? data.featuredImage.id : data.featuredImage;
            if (mediaId) {
              const mediaDoc = (await req.payload.findByID({
                collection: 'media',
                id: mediaId,
                depth: 0,
                overrideAccess: true,
              })) as any;
              if (mediaDoc?.url) {
                data.featuredImageUrl = mediaDoc.url;
              } else if (mediaDoc?.filename) {
                data.featuredImageUrl = `https://tqeqccszyxstsxtoffzf.supabase.co/storage/v1/object/public/media/${mediaDoc.filename}`;
              }
            }
          } catch {
            // Ignore error
          }
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, req, previousDoc }) => {
        try {
          const currentAuthorId = typeof doc?.author === 'object' ? doc?.author?.id : doc?.author;
          const prevAuthorId = typeof previousDoc?.author === 'object' ? previousDoc?.author?.id : previousDoc?.author;
          const authorIds = Array.from(new Set([currentAuthorId, prevAuthorId].filter(Boolean)));

          for (const authorId of authorIds) {
            try {
              const countResult = await req.payload.count({
                collection: 'posts',
                where: {
                  author: { equals: authorId },
                  status: { equals: 'published' },
                },
                overrideAccess: true,
              });
              await req.payload.update({
                collection: 'users',
                id: authorId,
                data: {
                  postCount: countResult.totalDocs,
                },
                overrideAccess: true,
              });
            } catch {
              // Ignore single user count sync error
            }
          }
        } catch (err) {
          console.error('Failed to sync editor post count:', err);
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        try {
          const authorId = typeof doc?.author === 'object' ? doc?.author?.id : doc?.author;
          if (authorId) {
            try {
              const countResult = await req.payload.count({
                collection: 'posts',
                where: {
                  author: { equals: authorId },
                  status: { equals: 'published' },
                },
                overrideAccess: true,
              });
              await req.payload.update({
                collection: 'users',
                id: authorId,
                data: {
                  postCount: countResult.totalDocs,
                },
                overrideAccess: true,
              });
            } catch {
              // Ignore single user count sync error
            }
          }
        } catch (err) {
          console.error('Failed to sync editor post count after deletion:', err);
        }
      },
    ],
  },
  fields: [
    {
      name: 'publicationNotice',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/PostPublishNotification#PostPublishNotification',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Article Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (e.g. bilateral-summit-2026)',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Institutional News / 论坛要闻', value: 'Institutional News' },
        { label: 'Strategic Dialogue / 高端对话', value: 'Strategic Dialogue' },
        { label: 'Industry Action / 重点产业', value: 'Industry Action' },
        { label: 'Investment Insights / 投资洞察', value: 'Investment Insights' },
        { label: 'Summit & Events / 盛会专栏', value: 'Summit & Events' },
      ],
      defaultValue: 'Institutional News',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Published (Visible on Website)', value: 'published' },
        { label: 'Draft (Hidden)', value: 'draft' },
      ],
      defaultValue: 'published',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      label: 'Feature on Homepage Slider',
      admin: {
        position: 'sidebar',
        description: 'Pin this article to the homepage sliding carousel',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      label: 'Assigned Editor / Correspondent',
      admin: {
        position: 'sidebar',
        description: 'Select the editor responsible for this article. Total post count will be tracked automatically.',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      label: 'Author Name (Fallback)',
      defaultValue: 'ACCBCF Secretariat',
      admin: {
        position: 'sidebar',
        description: 'Displayed if no specific user account is assigned.',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      localized: true,
      defaultValue: '4 min read',
      label: 'Estimated Read Time',
      admin: {
        position: 'sidebar',
        placeholder: 'e.g. 4 min read / 约 4 分钟',
      },
    },
    // Pictures & Media Section
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      label: 'Featured News Picture (Upload)',
      admin: {
        description: 'Upload high-resolution article photo from your computer',
      },
    },
    {
      name: 'featuredImageUrl',
      type: 'text',
      label: 'Featured Image URL (Fallback)',
      admin: {
        description: 'Direct image path or link if not uploading file (e.g. /images/forum/...)',
      },
    },
    {
      name: 'imageCaption',
      type: 'text',
      localized: true,
      label: 'Picture Caption / Credit',
      admin: {
        placeholder: 'e.g. Ministerial dignitaries at the Federal Secretariat in Abuja',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Article Summary / Excerpt',
      admin: {
        description: 'Short 2-3 sentence overview displayed on cards and search snippets',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Full Article Content',
      admin: {
        description: 'Detailed article narrative (use blank lines to separate paragraphs)',
      },
    },
    // SEO Settings Group
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Search Engine Optimization',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          label: 'SEO Meta Title',
          admin: {
            placeholder: 'Custom browser tab & Google search title (defaults to Article Title)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          label: 'SEO Meta Description',
          admin: {
            placeholder: '150-160 character snippet for Google search rankings',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          label: 'Target Keywords',
          admin: {
            placeholder: 'ACCBCF, China Africa Trade, Abuja Summit, Bilateral Joint Venture',
          },
        },
        {
          name: 'ogImage',
          type: 'relationship',
          relationTo: 'media',
          hasMany: false,
          label: 'Social Media Sharing Image (OpenGraph)',
          admin: {
            description: 'Custom preview picture for Twitter/X, Facebook, and LinkedIn sharing',
          },
        },
        {
          name: 'ogImageUrl',
          type: 'text',
          label: 'Social Image URL Fallback',
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL',
          admin: {
            placeholder: 'https://africachinachairmenforum.org/...',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          label: 'Exclude from Search Engines (noindex)',
        },
      ],
    },
  ],
};
