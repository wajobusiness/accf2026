/**
 * Utilities for YouTube Video Management, URL parsing, ID extraction,
 * thumbnail resolution, and metadata retrieval.
 */

/**
 * Robustly extracts the 11-character YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID?si=...
 * - https://youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/live/VIDEO_ID
 * - Direct 11-char ID
 */
export function extractYouTubeVideoId(url: string | undefined | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex for YouTube URLs
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regex);
  if (match && match[1] && match[1].length === 11) {
    return match[1];
  }

  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.slice(1).split(/[?#&]/)[0];
      if (id && id.length === 11) return id;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v && v.length === 11) return v;

      const segments = parsed.pathname.split('/').filter(Boolean);
      if (segments.length >= 2 && ['shorts', 'embed', 'v', 'live'].includes(segments[0])) {
        const id = segments[1];
        if (id && id.length === 11) return id;
      }
    }
  } catch {
    // ignore parsing failure
  }

  return null;
}

/**
 * Validates if the string is a valid YouTube video link or ID.
 */
export function isValidYouTubeUrl(url: string | undefined | null): boolean {
  return Boolean(extractYouTubeVideoId(url));
}

/**
 * Returns the primary and fallback YouTube thumbnail URLs for a given video ID.
 */
export function getYouTubeThumbnailUrls(videoId: string) {
  return {
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
  };
}

/**
 * Fetches official YouTube oEmbed metadata (title, author, etc.)
 */
export async function fetchYouTubeOEmbed(urlOrId: string): Promise<{
  title?: string;
  authorName?: string;
  thumbnailUrl?: string;
} | null> {
  const videoId = extractYouTubeVideoId(urlOrId);
  if (!videoId) return null;

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      title: data.title || undefined,
      authorName: data.author_name || undefined,
      thumbnailUrl: data.thumbnail_url || undefined,
    };
  } catch {
    return null;
  }
}

