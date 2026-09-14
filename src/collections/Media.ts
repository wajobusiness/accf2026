import type { CollectionConfig } from 'payload';
import { uploadMediaToSupabase, deleteMediaFromSupabase } from '@/lib/supabaseStorage';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    group: 'Editorial & Dispatches',
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize', 'createdAt'],
  },
  upload: {
    staticDir: 'public/media',
    disableLocalStorage: true, // Prevents EROFS read-only filesystem crash on Vercel
    adminThumbnail: ({ doc }) => {
      if (doc?.url && typeof doc.url === 'string') return doc.url;
      return null;
    },
    mimeTypes: ['image/*'],
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (data) {
          // Automatically populate 'alt' from filename if user didn't type an alt description
          if (!data.alt || typeof data.alt !== 'string' || data.alt.trim() === '') {
            const file = req?.file;
            if (file?.name) {
              data.alt = file.name
                .replace(/\.[^/.]+$/, '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase());
            } else {
              data.alt = 'ACCBCF Media Asset';
            }
          }
        }
        return data;
      },
    ],
    beforeChange: [
      async ({ data, req }) => {
        const file = req?.file;
        if (file && file.data) {
          try {
            const { url, filename } = await uploadMediaToSupabase({
              name: data.filename || file.name,
              data: file.data,
              mimetype: data.mimeType || file.mimetype || 'image/jpeg',
            });
            data.url = url;
            data.thumbnailURL = url;
            data.filename = filename;
          } catch (err: any) {
            req.payload.logger.error(`Media Supabase Upload error: ${err.message}`);
            if (!data.url && data.filename) {
              data.url = `https://tqeqccszyxstsxtoffzf.supabase.co/storage/v1/object/public/media/${data.filename}`;
            }
          }
        }
        return data;
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc?.url && typeof doc.url === 'string') {
          await deleteMediaFromSupabase(doc.url);
        } else if (doc?.filename) {
          await deleteMediaFromSupabase(doc.filename);
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text / Image Description',
      defaultValue: 'ACCBCF Media Asset',
      admin: {
        description: 'Descriptive text for accessibility and SEO (auto-generated if left blank)',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption / Photo Credit',
    },
  ],
};
