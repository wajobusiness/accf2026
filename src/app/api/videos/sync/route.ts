import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { fetchLiveYouTubeChannelVideos, OFFICIAL_YOUTUBE_CHANNEL } from '@/lib/youtubeSync';
import { getPublishedVideos } from '@/lib/videoService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'en') as any;

    const liveVideos = await fetchLiveYouTubeChannelVideos(locale);
    const allVideos = await getPublishedVideos({ locale });

    return NextResponse.json({
      success: true,
      channel: OFFICIAL_YOUTUBE_CHANNEL,
      totalLiveVideos: liveVideos.length,
      totalPublishedVideos: allVideos.length,
      syncedAt: new Date().toISOString(),
      videos: allVideos,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to synchronize with YouTube channel',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Invalidate Next.js cache for videos
    revalidateTag('youtube-videos', { expire: 0 });
    revalidateTag('accbcf-videos', { expire: 0 });
    revalidatePath('/[locale]/events', 'page');
    revalidatePath('/[locale]', 'page');
    revalidatePath('/', 'layout');

    const syncedVideos = await fetchLiveYouTubeChannelVideos('en');

    return NextResponse.json({
      success: true,
      message: 'YouTube video channel revalidated and synchronized successfully',
      channel: OFFICIAL_YOUTUBE_CHANNEL,
      syncedCount: syncedVideos.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to revalidate YouTube channel cache',
      },
      { status: 500 }
    );
  }
}

