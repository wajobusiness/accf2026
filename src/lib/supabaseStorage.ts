import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://tqeqccszyxstsxtoffzf.supabase.co';

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_1xvhvHXbMvSIVAFhdbscLw_zAKZUENV';

export const supabaseStorage = createClient(supabaseUrl, supabaseKey);

export const BUCKET_NAME = 'media';

/**
 * Upload a binary buffer directly to the public Supabase Storage 'media' bucket.
 * Returns the permanent public CDN URL.
 */
export async function uploadMediaToSupabase(file: {
  name: string;
  data: Buffer;
  mimetype: string;
}): Promise<{ url: string; filename: string }> {
  const timestamp = Date.now();
  const rawBaseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
  const extension = file.name.includes('.') ? file.name.split('.').pop() : '';
  const cleanBaseName = rawBaseName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const finalFilename = extension
    ? `${timestamp}-${cleanBaseName || 'asset'}.${extension.toLowerCase()}`
    : `${timestamp}-${cleanBaseName || 'asset'}`;

  const { error } = await supabaseStorage.storage
    .from(BUCKET_NAME)
    .upload(finalFilename, file.data, {
      contentType: file.mimetype || 'image/jpeg',
      cacheControl: '31536000',
      upsert: true,
    });

  if (error) {
    console.error('Supabase Storage Upload Error:', error);
    throw new Error(`Failed to upload image to Supabase Storage: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabaseStorage.storage.from(BUCKET_NAME).getPublicUrl(finalFilename);

  return {
    url: publicUrl,
    filename: finalFilename,
  };
}

/**
 * Deletes a file from Supabase Storage by its stored filename or public URL.
 */
export async function deleteMediaFromSupabase(urlOrFilename: string): Promise<void> {
  try {
    const filename = urlOrFilename.split('/').pop()?.split('?')[0];
    if (filename) {
      await supabaseStorage.storage.from(BUCKET_NAME).remove([filename]);
    }
  } catch (err) {
    console.warn('Failed to delete media from Supabase Storage:', err);
  }
}

