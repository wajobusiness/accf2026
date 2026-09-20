import type { CollectionConfig } from 'payload';
import { extractYouTubeVideoId, getYouTubeThumbnailUrls, fetchYouTubeOEmbed } from '../lib/videoUtils';

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: {
    singular: 'Video',
    plural: 'Video Management',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => {
      if (!req.user) return false;
      if (req.user.role === 'admin') return true;
      return {
        createdBy: {
          equals: req.user.id,
        },
      };
    },
    delete: ({ req }) => {
      if (!req.user) return false;
      if (req.user.role === 'admin') return true;
      return {
        createdBy: {
          equals: req.user.id,
        },
      };
    },
  },
  defaultSort: 'displayOrder',
  admin: {
    group: 'News & Media',
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventName', 'category', 'status', 'featured', 'displayOrder', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        if (!data) return data;

        // 1. Extract and Validate YouTube URL & Video ID
        if (data.youtubeUrl && typeof data.youtubeUrl === 'string') {
          const videoId = extractYouTubeVideoId(data.youtubeUrl);
          if (videoId) {
            data.youtubeVideoId = videoId;
            const thumbs = getYouTubeThumbnailUrls(videoId);
            data.thumbnailUrl = thumbs.maxres;

            // 2. Fetch official title from YouTube if title is empty on create
            const rawTitle =
              typeof data.title === 'string'
                ? data.title
                : typeof data.title === 'object'
                ? data.title?.en || Object.values(data.title)[0]
                : '';

            if ((!rawTitle || rawTitle.trim() === '') && operation === 'create') {
              try {
                const meta = await fetchYouTubeOEmbed(videoId);
                if (meta?.title) {
                  data.title = meta.title;
                }
              } catch {
                // Fallback to default placeholder if fetch fails
                data.title = 'Africa China Chairmen Forum Video';
              }
            }
          }
        }

        // 3. Auto-assign logged in author/publisher if not set
        if (!data.createdBy && req?.user?.id) {
          data.createdBy = req.user.id;
        }

        if (!data.createdByName && req?.user) {
          const userDoc = req.user as any;
          data.createdByName = userDoc.name || 'ACCBCF Media Bureau';
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: 'videoPreviewNotice',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/VideoPreviewField#VideoPreviewField',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Video Title',
      admin: {
        placeholder: 'e.g. Keynote Address at Africa China Chairmen Summit',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      required: true,
      label: 'YouTube Video URL',
      admin: {
        placeholder: 'e.g. https://youtu.be/M-ECrNzhg9k or https://www.youtube.com/watch?v=M-ECrNzhg9k',
        description: 'Paste the YouTube watch, share, shorts, or embed URL.',
      },
      validate: (value: string | null | undefined) => {
        if (!value || typeof value !== 'string') {
          return 'YouTube Video URL is required.';
        }
        const id = extractYouTubeVideoId(value);
        if (!id) {
          return 'Please provide a valid YouTube URL (e.g. https://youtu.be/... or https://www.youtube.com/watch?v=...)';
        }
        return true;
      },
    },
    {
      name: 'youtubeVideoId',
      type: 'text',
      required: true,
      label: 'YouTube Video ID',
      admin: {
        position: 'sidebar',
        description: 'Auto-extracted 11-character identifier (e.g. M-ECrNzhg9k)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Short Description / Overview',
      admin: {
        placeholder: 'Summary of the keynote, ministerial speeches, or session highlights...',
      },
    },
    {
      name: 'eventName',
      type: 'text',
      localized: true,
      label: 'Event Name / Summit Session',
      admin: {
        placeholder: 'e.g. Africa China Chairmen Forum 2026 · Abuja Plenary',
      },
    },
    {
      name: 'eventDate',
      type: 'date',
      label: 'Event / Broadcast Date',
      admin: {
        position: 'sidebar',
        description: 'Date the event took place or was broadcast',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Summit & Events / 盛会专栏', value: 'Summit & Events' },
        { label: 'Keynote & Presentations / 主旨演讲', value: 'Keynote & Presentations' },
        { label: 'Bilateral Dialogue / 高端对话', value: 'Bilateral Dialogue' },
        { label: 'Strategic Sectors / 重点产业', value: 'Strategic Sectors' },
        { label: 'Special Coverage / 特别报道', value: 'Special Coverage' },
      ],
      defaultValue: 'Summit & Events',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 1,
      required: true,
      label: 'Display Order',
      admin: {
        position: 'sidebar',
        description: 'Numeric sorting order on the public Events page (1 appears first)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature in Spotlight Hero',
      admin: {
        position: 'sidebar',
        description: 'Pin this video to the top spotlight cinema player on the Events page',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Published (Visible on Website)', value: 'published' },
        { label: 'Draft (Hidden)', value: 'draft' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'published',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      label: 'Custom Thumbnail Override (Upload)',
      admin: {
        position: 'sidebar',
        description: 'Optional high-resolution custom cover image overriding the default YouTube thumbnail',
      },
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
      label: 'YouTube CDN Thumbnail URL',
      admin: {
        position: 'sidebar',
        description: 'Auto-resolved maxres / hqdefault image URL',
      },
    },
    {
      name: 'tags',
      type: 'text',
      label: 'Search Tags / Keywords',
      admin: {
        position: 'sidebar',
        placeholder: 'e.g. Renewable Energy, Mining, Abuja 2026',
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      label: 'Publisher / Uploader',
      admin: {
        position: 'sidebar',
        description: 'Editor or Administrator who created this video record',
      },
    },
    {
      name: 'createdByName',
      type: 'text',
      defaultValue: 'ACCBCF Media Bureau',
      label: 'Publisher Name (Fallback)',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

