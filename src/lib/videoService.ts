import type { Locale } from './content';
import { getYouTubeThumbnailUrls } from './videoUtils';

export interface VideoItem {
  id: string | number;
  title: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  description?: string;
  eventName?: string;
  eventDate?: string;
  thumbnailUrl: string;
  category: string;
  tags?: string;
  displayOrder: number;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  createdByName?: string;
  createdAt?: string;
}

export const FALLBACK_VIDEOS: Record<Locale, VideoItem[]> = {
  en: [
    {
      id: 1,
      youtubeUrl: 'https://youtu.be/M-ECrNzhg9k?si=7IQRtt0-i4acd73W',
      youtubeVideoId: 'M-ECrNzhg9k',
      title: 'Africa China News Interview with Felicity Solar Marketing Manager with Mr Liu Zhenfeng',
      eventName: 'Africa China Chairmen Forum 2026',
      eventDate: '2026-03-30',
      description: 'Official high-level bilateral interview highlighting solar power infrastructure and green manufacturing expansion across Africa.',
      thumbnailUrl: 'https://img.youtube.com/vi/M-ECrNzhg9k/maxresdefault.jpg',
      category: 'Summit & Events',
      tags: 'Solar Energy, Green Power, Strategic Dialogue',
      displayOrder: 1,
      featured: true,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 2,
      youtubeUrl: 'https://youtu.be/Fht3EBzPWCw?si=UkuoLsX0EvtPaf3f',
      youtubeVideoId: 'Fht3EBzPWCw',
      title: 'Nigeria-China Energy Cooperation Takes Centre Stage at New Energy Expo in Lagos',
      eventName: 'Lagos New Energy Expo & Bilateral Summit',
      eventDate: '2026-03-28',
      description: 'Keynote proceedings and corporate showcases from the premier Nigeria-China clean energy exposition in Lagos.',
      thumbnailUrl: 'https://img.youtube.com/vi/Fht3EBzPWCw/maxresdefault.jpg',
      category: 'Strategic Sectors',
      tags: 'Energy Cooperation, Lagos Expo, Bilateral Trade',
      displayOrder: 2,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
  ],
  zh: [
    {
      id: 1,
      youtubeUrl: 'https://youtu.be/M-ECrNzhg9k?si=7IQRtt0-i4acd73W',
      youtubeVideoId: 'M-ECrNzhg9k',
      title: '中非经贸要闻专访：菲利斯蒂太阳能营销总监刘振峰先生深度对话',
      eventName: '非洲中国会长论坛2026全球峰会',
      eventDate: '2026-03-30',
      description: '官方高端双边访谈，重点展示中非清洁能源合作与绿色制造走廊的战略落地。',
      thumbnailUrl: 'https://img.youtube.com/vi/M-ECrNzhg9k/maxresdefault.jpg',
      category: 'Summit & Events',
      tags: '太阳能, 清洁能源, 战略对话',
      displayOrder: 1,
      featured: true,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 2,
      youtubeUrl: 'https://youtu.be/Fht3EBzPWCw?si=UkuoLsX0EvtPaf3f',
      youtubeVideoId: 'Fht3EBzPWCw',
      title: '尼日利亚与中国新能源合作在拉各斯新能源博览会上成为瞩目焦点',
      eventName: '拉各斯新能源博览会与双边峰会',
      eventDate: '2026-03-28',
      description: '拉各斯首届尼中清洁能源博览会盛况，聚焦双边技术转移与重大电网投资。',
      thumbnailUrl: 'https://img.youtube.com/vi/Fht3EBzPWCw/maxresdefault.jpg',
      category: 'Strategic Sectors',
      tags: '能源合作, 拉各斯博览会, 双边经贸',
      displayOrder: 2,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
  ],
  fr: [
    {
      id: 1,
      youtubeUrl: 'https://youtu.be/M-ECrNzhg9k?si=7IQRtt0-i4acd73W',
      youtubeVideoId: 'M-ECrNzhg9k',
      title: 'Interview Exclusive Afrique-Chine : M. Liu Zhenfeng, Responsable Marketing chez Felicity Solar',
      eventName: 'Forum des Présidents Afrique-Chine 2026',
      eventDate: '2026-03-30',
      description: 'Entretien bilatéral de haut niveau mettant en lumière les infrastructures d’énergie solaire en Afrique.',
      thumbnailUrl: 'https://img.youtube.com/vi/M-ECrNzhg9k/maxresdefault.jpg',
      category: 'Summit & Events',
      tags: 'Énergie Solaire, Industrie Verte',
      displayOrder: 1,
      featured: true,
      status: 'published',
      createdByName: 'Bureau Médias ACCBCF',
    },
    {
      id: 2,
      youtubeUrl: 'https://youtu.be/Fht3EBzPWCw?si=UkuoLsX0EvtPaf3f',
      youtubeVideoId: 'Fht3EBzPWCw',
      title: 'La Coopération Énergétique Nigéria-Chine à l’Honneur lors de l’Expo sur les Nouvelles Énergies à Lagos',
      eventName: 'Expo Nouvelles Énergies de Lagos & Sommet Bilatéral',
      eventDate: '2026-03-28',
      description: 'Moments forts de la conférence et présentations d’entreprises lors du salon sino-nigérian de l’énergie.',
      thumbnailUrl: 'https://img.youtube.com/vi/Fht3EBzPWCw/maxresdefault.jpg',
      category: 'Strategic Sectors',
      tags: 'Coopération Énergétique, Expo Lagos',
      displayOrder: 2,
      featured: false,
      status: 'published',
      createdByName: 'Bureau Médias ACCBCF',
    },
  ],
  ar: [
    {
      id: 1,
      youtubeUrl: 'https://youtu.be/M-ECrNzhg9k?si=7IQRtt0-i4acd73W',
      youtubeVideoId: 'M-ECrNzhg9k',
      title: 'مقابلة إخبارية إفريقية صينية مع مدير التسويق لشركة فيليسيتي للطاقة الشمسية السيد ليو تشن فنغ',
      eventName: 'منتدى رؤساء الأعمال الإفريقية الصينية 2026',
      eventDate: '2026-03-30',
      description: 'مقابلة ثنائية رفيعة المستوى تسلط الضوء على فرص البنية التحتية للطاقة الشمسية والتصنيع الأخضر في إفريقيا.',
      thumbnailUrl: 'https://img.youtube.com/vi/M-ECrNzhg9k/maxresdefault.jpg',
      category: 'Summit & Events',
      tags: 'الطاقة الشمسية, الاستثمار الثنائي',
      displayOrder: 1,
      featured: true,
      status: 'published',
      createdByName: 'المكتب الإعلامي لمنتدى ACCBCF',
    },
    {
      id: 2,
      youtubeUrl: 'https://youtu.be/Fht3EBzPWCw?si=UkuoLsX0EvtPaf3f',
      youtubeVideoId: 'Fht3EBzPWCw',
      title: 'التعاون في مجال الطاقة بين نيجيريا والصين يحتل مركز الصدارة في معرض الطاقة الجديدة في لاغوس',
      eventName: 'معرض الطاقة الجديدة في لاغوس والقمة الثنائية',
      eventDate: '2026-03-28',
      description: 'أبرز فعاليات المعرض الثنائي ومداولات الشركات حول استثمارات الطاقة المتجددة في لاغوس.',
      thumbnailUrl: 'https://img.youtube.com/vi/Fht3EBzPWCw/maxresdefault.jpg',
      category: 'Strategic Sectors',
      tags: 'التعاون في الطاقة, معرض لاغوس',
      displayOrder: 2,
      featured: false,
      status: 'published',
      createdByName: 'المكتب الإعلامي لمنتدى ACCBCF',
    },
  ],
  pt: [
    {
      id: 1,
      youtubeUrl: 'https://youtu.be/M-ECrNzhg9k?si=7IQRtt0-i4acd73W',
      youtubeVideoId: 'M-ECrNzhg9k',
      title: 'Entrevista África-China com o Gerente de Marketing da Felicity Solar, Sr. Liu Zhenfeng',
      eventName: 'Fórum de Presidentes África-China 2026',
      eventDate: '2026-03-30',
      description: 'Entrevista bilateral de alto nível destacando as parcerias em energia solar e manufatura verde na África.',
      thumbnailUrl: 'https://img.youtube.com/vi/M-ECrNzhg9k/maxresdefault.jpg',
      category: 'Summit & Events',
      tags: 'Energia Solar, Indústria Verde',
      displayOrder: 1,
      featured: true,
      status: 'published',
      createdByName: 'Gabinete de Mídia ACCBCF',
    },
    {
      id: 2,
      youtubeUrl: 'https://youtu.be/Fht3EBzPWCw?si=UkuoLsX0EvtPaf3f',
      youtubeVideoId: 'Fht3EBzPWCw',
      title: 'Cooperação Energética Nigéria-China Ganha Destaque na Expo de Novas Energias em Lagos',
      eventName: 'Expo de Novas Energias de Lagos e Cúpula Bilateral',
      eventDate: '2026-03-28',
      description: 'Destaques da conferência e exposições corporativas da feira de novas energias em Lagos.',
      thumbnailUrl: 'https://img.youtube.com/vi/Fht3EBzPWCw/maxresdefault.jpg',
      category: 'Strategic Sectors',
      tags: 'Cooperação Energética, Expo Lagos',
      displayOrder: 2,
      featured: false,
      status: 'published',
      createdByName: 'Gabinete de Mídia ACCBCF',
    },
  ],
};

/**
 * Server-side data retriever for published videos from Payload CMS.
 */
export async function getPublishedVideos(options?: {
  locale?: Locale;
  limit?: number;
  featuredOnly?: boolean;
}): Promise<VideoItem[]> {
  const locale: Locale = options?.locale || 'en';
  const limit = options?.limit || 20;

  try {
    const { getPayload } = await import('payload');
    const configModule = await import('@/payload.config');
    const payload = await getPayload({ config: configModule.default });

    const whereClause: any = {
      status: { equals: 'published' },
    };

    if (options?.featuredOnly) {
      whereClause.featured = { equals: true };
    }

    const videosResult = await payload.find({
      collection: 'videos' as any,
      where: whereClause,
      sort: 'displayOrder',
      limit,
      depth: 1,
      locale,
      fallbackLocale: 'en',
    });

    if (videosResult && videosResult.docs && videosResult.docs.length > 0) {
      return videosResult.docs.map((doc: any) => {
        const videoId = doc.youtubeVideoId || '';
        const defaultThumbs = videoId ? getYouTubeThumbnailUrls(videoId) : null;
        
        let thumb = doc.thumbnailUrl || defaultThumbs?.maxres || defaultThumbs?.hq || '';
        if (doc.featuredImage) {
          const fi = doc.featuredImage;
          if (typeof fi === 'object') {
            thumb = fi.url || (fi.filename ? `https://tqeqccszyxstsxtoffzf.supabase.co/storage/v1/object/public/media/${fi.filename}` : thumb);
          } else if (typeof fi === 'string') {
            thumb = fi;
          }
        }

        const title =
          typeof doc.title === 'string'
            ? doc.title
            : typeof doc.title === 'object'
            ? doc.title[locale] || doc.title.en || Object.values(doc.title)[0] || ''
            : '';

        const description =
          typeof doc.description === 'string'
            ? doc.description
            : typeof doc.description === 'object'
            ? doc.description[locale] || doc.description.en || Object.values(doc.description || {})[0] || ''
            : '';

        const eventName =
          typeof doc.eventName === 'string'
            ? doc.eventName
            : typeof doc.eventName === 'object'
            ? doc.eventName[locale] || doc.eventName.en || Object.values(doc.eventName || {})[0] || ''
            : '';

        return {
          id: doc.id,
          title: title || 'Africa China Chairmen Forum Video',
          youtubeUrl: doc.youtubeUrl,
          youtubeVideoId: videoId,
          description: description || undefined,
          eventName: eventName || undefined,
          eventDate: doc.eventDate ? new Date(doc.eventDate).toISOString().split('T')[0] : undefined,
          thumbnailUrl: thumb,
          category: doc.category || 'Summit & Events',
          tags: doc.tags || undefined,
          displayOrder: Number(doc.displayOrder) || 1,
          featured: Boolean(doc.featured),
          status: doc.status || 'published',
          createdByName: doc.createdByName || 'ACCBCF Media Bureau',
          createdAt: doc.createdAt,
        };
      });
    }
  } catch (error) {
    console.warn('Failed to load videos from Payload CMS, using fallback data:', error);
  }

  const fallback = FALLBACK_VIDEOS[locale] || FALLBACK_VIDEOS.en;
  if (options?.featuredOnly) {
    return fallback.filter((v) => v.featured);
  }
  return fallback;
}

