import type { Locale } from './content';
import type { VideoItem } from './videoService';
import { getYouTubeThumbnailUrls } from './videoUtils';

export const OFFICIAL_YOUTUBE_CHANNEL = {
  handle: '@africachinachairmenforum',
  name: 'Africa China Chairmen Forum',
  channelId: 'UCkRDg-boPzZ4Ip8a125TXEA',
  channelUrl: 'https://www.youtube.com/@africachinachairmenforum',
  feedUrl: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCkRDg-boPzZ4Ip8a125TXEA',
};

/**
 * Clean raw YouTube title and infer meaningful event name and category
 */
function parseVideoMetadata(rawTitle: string): {
  cleanTitle: string;
  category: string;
  eventName: string;
} {
  let cleanTitle = rawTitle
    .replace(/#\w+/g, '') // remove hashtags like #shorts #agtech
    .replace(/\s+/g, ' ')
    .trim();

  let category = 'Summit & Events';
  let eventName = 'Africa China Chairmen Forum';

  const lower = cleanTitle.toLowerCase();
  if (lower.includes('diplomacy') || lower.includes('envoy') || lower.includes('ambassador') || lower.includes('philippine')) {
    category = 'Bilateral Diplomacy';
    eventName = 'Diplomatic Mission & High-Level Dialogue';
  } else if (lower.includes('energy') || lower.includes('solar') || lower.includes('felicity') || lower.includes('clean energy')) {
    category = 'Energy & Infrastructure';
    eventName = 'Bilateral Clean Energy Initiative';
  } else if (lower.includes('steel') || lower.includes('manufacturing') || lower.includes('lemax') || lower.includes('industry')) {
    category = 'Industrial Cooperation';
    eventName = 'Industrial Delegations & Manufacturing Partnerships';
  } else if (lower.includes('bank') || lower.includes('parallex') || lower.includes('trade') || lower.includes('finance')) {
    category = 'Finance & Bilateral Trade';
    eventName = 'Sovereign & Commercial Banking Alignment';
  } else if (lower.includes('agri') || lower.includes('farm') || lower.includes('crop')) {
    category = 'Agricultural Technology';
    eventName = 'Modern Agriculture & Food Security Corridor';
  } else if (lower.includes('partner') || lower.includes('shaping the future')) {
    category = 'Strategic Partnerships';
    eventName = 'ACCBCF Continental Strategy & Plenary';
  }

  return { cleanTitle, category, eventName };
}

/**
 * Parses the YouTube Atom XML feed into VideoItem array.
 */
export function parseYouTubeAtomFeed(xmlText: string, locale: Locale = 'en'): VideoItem[] {
  const entries: VideoItem[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  let order = 1;
  while ((match = entryRegex.exec(xmlText)) !== null) {
    const entryBlock = match[1];

    const videoIdMatch = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entryBlock);
    const titleMatch = /<title>([^<]+)<\/title>/.exec(entryBlock);
    const publishedMatch = /<published>([^<]+)<\/published>/.exec(entryBlock);
    const descMatch = /<media:description>([\s\S]*?)<\/media:description>/.exec(entryBlock);

    if (videoIdMatch && titleMatch) {
      const videoId = videoIdMatch[1].trim();
      const rawTitle = titleMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
      const published = publishedMatch ? publishedMatch[1].trim() : '';
      const rawDesc = descMatch ? descMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim() : '';

      const { cleanTitle, category, eventName } = parseVideoMetadata(rawTitle);
      const thumbs = getYouTubeThumbnailUrls(videoId);

      const eventDate = published ? published.split('T')[0] : new Date().toISOString().split('T')[0];

      entries.push({
        id: `yt-${videoId}`,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        youtubeVideoId: videoId,
        title: cleanTitle,
        eventName,
        eventDate,
        description: rawDesc || `Official broadcast dispatch from Africa China Chairmen Forum: ${cleanTitle}`,
        thumbnailUrl: thumbs.maxres,
        category,
        tags: `${category}, Africa China, Official Broadcast`,
        displayOrder: order++,
        featured: order === 2, // First video featured
        status: 'published',
        createdByName: 'ACCBCF Official YouTube Channel',
        createdAt: published,
      });
    }
  }

  return entries;
}

/**
 * Fetch live videos directly from the YouTube channel RSS feed with automatic caching and revalidation.
 */
export async function fetchLiveYouTubeChannelVideos(locale: Locale = 'en'): Promise<VideoItem[]> {
  try {
    const response = await fetch(OFFICIAL_YOUTUBE_CHANNEL.feedUrl, {
      next: {
        revalidate: 300, // Revalidate every 5 minutes automatically
        tags: ['youtube-videos', 'accbcf-videos'],
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ACCBCF-SyncBot/1.0; +https://www.africachinachairmenforum.com)',
        Accept: 'application/atom+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      console.warn(`[YouTube Sync] Feed HTTP error ${response.status} ${response.statusText}`);
      return [];
    }

    const xmlText = await response.text();
    const videos = parseYouTubeAtomFeed(xmlText, locale);
    if (videos.length > 0) {
      return videos;
    }
  } catch (err) {
    console.warn('[YouTube Sync] Failed to fetch live YouTube feed:', err);
  }
  return [];
}

