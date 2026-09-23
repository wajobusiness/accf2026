import type { Locale } from './content';
import { getYouTubeThumbnailUrls } from './videoUtils';
import { fetchLiveYouTubeChannelVideos, OFFICIAL_YOUTUBE_CHANNEL } from './youtubeSync';

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
      youtubeUrl: 'https://www.youtube.com/watch?v=iWhDtiAuaBs',
      youtubeVideoId: 'iWhDtiAuaBs',
      title: 'ACCBCF CHAIRMAN ENGAGES PHILIPPINE ENVOY ON BOOSTING DIPLOMACY AND FRIENDSHIP',
      eventName: 'Diplomatic Mission & Bilateral Reception',
      eventDate: '2026-09-23',
      description: 'High-level strategic audience between ACCBCF National Chairman and Philippine diplomatic envoys in Abuja to strengthen multilateral cooperation and friendly bilateral ties.',
      thumbnailUrl: 'https://img.youtube.com/vi/iWhDtiAuaBs/maxresdefault.jpg',
      category: 'Bilateral Diplomacy',
      tags: 'Diplomacy, Envoy, Multilateral Alignment, Abuja',
      displayOrder: 1,
      featured: true,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 2,
      youtubeUrl: 'https://www.youtube.com/watch?v=XpIKl-S4axo',
      youtubeVideoId: 'XpIKl-S4axo',
      title: 'LEMAX Managing Director Mr HU & Sales Manager Mr Umar Dili Discussing Business Opportunities',
      eventName: 'Manufacturing & Commercial Partnerships',
      eventDate: '2026-09-22',
      description: 'Strategic consultation on expanding industrial equipment supply chains, manufacturing ventures, and joint commercial corridors.',
      thumbnailUrl: 'https://img.youtube.com/vi/XpIKl-S4axo/maxresdefault.jpg',
      category: 'Industrial Cooperation',
      tags: 'LEMAX, Manufacturing, Joint Ventures, Commercial Trade',
      displayOrder: 2,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 3,
      youtubeUrl: 'https://www.youtube.com/watch?v=A8riYqmAYck',
      youtubeVideoId: 'A8riYqmAYck',
      title: 'LEMAX Commercial Delegation: Advanced Manufacturing & Machinery Expansion in Nigeria',
      eventName: 'Industrial Equipment & Capital Investment',
      eventDate: '2026-09-22',
      description: 'Deliberation on heavy machinery deployment and setting up manufacturing hubs across priority Nigerian economic corridors.',
      thumbnailUrl: 'https://img.youtube.com/vi/A8riYqmAYck/maxresdefault.jpg',
      category: 'Industrial Cooperation',
      tags: 'Machinery, Equipment, Capital Investment, Industrial Parks',
      displayOrder: 3,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 4,
      youtubeUrl: 'https://www.youtube.com/watch?v=M-ECrNzhg9k',
      youtubeVideoId: 'M-ECrNzhg9k',
      title: 'Africa China News Interview with Felicity Solar Marketing Manager Mr Liu Zhenfeng',
      eventName: 'Africa China Chairmen Forum 2026',
      eventDate: '2026-09-18',
      description: 'Official high-level bilateral interview highlighting solar power infrastructure and green manufacturing expansion across Africa.',
      thumbnailUrl: 'https://img.youtube.com/vi/M-ECrNzhg9k/maxresdefault.jpg',
      category: 'Energy & Infrastructure',
      tags: 'Solar Energy, Green Power, Strategic Dialogue',
      displayOrder: 4,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 5,
      youtubeUrl: 'https://www.youtube.com/watch?v=Fht3EBzPWCw',
      youtubeVideoId: 'Fht3EBzPWCw',
      title: 'Nigeria-China Energy Cooperation Takes Centre Stage at New Energy Expo in Lagos',
      eventName: 'Lagos New Energy Expo & Bilateral Summit',
      eventDate: '2026-09-18',
      description: 'Keynote proceedings and corporate showcases from the premier Nigeria-China clean energy exposition in Lagos.',
      thumbnailUrl: 'https://img.youtube.com/vi/Fht3EBzPWCw/maxresdefault.jpg',
      category: 'Energy & Infrastructure',
      tags: 'Energy Cooperation, Lagos Expo, Bilateral Trade',
      displayOrder: 5,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 6,
      youtubeUrl: 'https://www.youtube.com/watch?v=YGiA9rLG2yw',
      youtubeVideoId: 'YGiA9rLG2yw',
      title: 'How ACCBCF is Shaping the Future of Africa-China Strategic Partnerships',
      eventName: 'ACCBCF Continental Strategy & Plenary',
      eventDate: '2026-09-14',
      description: 'A comprehensive institutional overview of ACCBCF mandate, the 12 priority economic action corridors, and the 2026 Continental Summit.',
      thumbnailUrl: 'https://img.youtube.com/vi/YGiA9rLG2yw/maxresdefault.jpg',
      category: 'Strategic Partnerships',
      tags: 'Continental Summit, Institutional Mandate, Strategic Corridors',
      displayOrder: 6,
      featured: true,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 7,
      youtubeUrl: 'https://www.youtube.com/watch?v=_ceFSy4QenU',
      youtubeVideoId: '_ceFSy4QenU',
      title: "Nigeria's Agricultural Sector is Getting Massive Tech Upgrade",
      eventName: 'AgTech & Food Security Initiative',
      eventDate: '2026-07-17',
      description: 'Demonstrating smart agriculture, mechanized harvesting technology, and cross-border agribusiness investment corridors.',
      thumbnailUrl: 'https://img.youtube.com/vi/_ceFSy4QenU/maxresdefault.jpg',
      category: 'Agricultural Technology',
      tags: 'Agriculture, AgTech, Food Security, Mechanization',
      displayOrder: 7,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 8,
      youtubeUrl: 'https://www.youtube.com/watch?v=htiGMMBc988',
      youtubeVideoId: 'htiGMMBc988',
      title: "The Future of Nigeria's Clean Energy Starts with Strategic Partnerships",
      eventName: 'Clean Energy & Power Infrastructure',
      eventDate: '2026-07-10',
      description: 'Strategic roadmap for bilateral clean energy investments, solar micro-grids, and sustainable industrial power generation.',
      thumbnailUrl: 'https://img.youtube.com/vi/htiGMMBc988/maxresdefault.jpg',
      category: 'Energy & Infrastructure',
      tags: 'Clean Energy, Power Grids, Solar, Sustainability',
      displayOrder: 8,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 9,
      youtubeUrl: 'https://www.youtube.com/watch?v=G-Q3DiVMDfg',
      youtubeVideoId: 'G-Q3DiVMDfg',
      title: "Chief Yousuf Mike Ugwu Hosts Chinese Steel Industry Delegation to Advance Nigeria's Industries",
      eventName: 'Bilateral Steel & Heavy Industry Delegation',
      eventDate: '2026-07-06',
      description: 'Hosting executive leaders from leading Chinese metallurgy and steel corporations in Abuja to establish domestic manufacturing plants.',
      thumbnailUrl: 'https://img.youtube.com/vi/G-Q3DiVMDfg/maxresdefault.jpg',
      category: 'Industrial Cooperation',
      tags: 'Steel Industry, Metallurgy, Heavy Industry, Manufacturing',
      displayOrder: 9,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
    {
      id: 10,
      youtubeUrl: 'https://www.youtube.com/watch?v=_xBgmuhVerw',
      youtubeVideoId: '_xBgmuhVerw',
      title: 'Africa China Business Forum and Parallex Bank Discuss Partnership to Strengthen China-Africa Trade',
      eventName: 'Cross-Border Financial Settlement & Trade Financing',
      eventDate: '2026-07-03',
      description: 'Executive banking dialogue between ACCBCF leadership and Parallex Bank to facilitate seamless cross-border trade settlements and corporate finance.',
      thumbnailUrl: 'https://img.youtube.com/vi/_xBgmuhVerw/maxresdefault.jpg',
      category: 'Finance & Bilateral Trade',
      tags: 'Banking, Parallex Bank, Trade Finance, Settlement',
      displayOrder: 10,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF Media Bureau',
    },
  ],
  zh: [
    {
      id: 1,
      youtubeUrl: 'https://www.youtube.com/watch?v=iWhDtiAuaBs',
      youtubeVideoId: 'iWhDtiAuaBs',
      title: '论坛全国主席会见菲律宾驻地特使：深化双边外交互信与民间友谊',
      eventName: '外交使团双边接待与高层战略对话',
      eventDate: '2026-09-23',
      description: '论坛创会全国主席张晓鹏高级酋长在阿布贾总部会见外交特使，共商多边战略合作与民间友好往来。',
      thumbnailUrl: 'https://img.youtube.com/vi/iWhDtiAuaBs/maxresdefault.jpg',
      category: 'Bilateral Diplomacy',
      tags: '外交对话, 特使会晤, 多边合作',
      displayOrder: 1,
      featured: true,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 2,
      youtubeUrl: 'https://www.youtube.com/watch?v=XpIKl-S4axo',
      youtubeVideoId: 'XpIKl-S4axo',
      title: 'LEMAX 总经理胡先生与销售总监迪利先生共商非洲市场合资机遇',
      eventName: '制造业出海与产业合资洽谈',
      eventDate: '2026-09-22',
      description: '围绕工业制造装备出海、本地化生产组装及西非重点经贸走廊进行深入项目对接。',
      thumbnailUrl: 'https://img.youtube.com/vi/XpIKl-S4axo/maxresdefault.jpg',
      category: 'Industrial Cooperation',
      tags: 'LEMAX, 工业制造, 合资企业, 装备出海',
      displayOrder: 2,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 3,
      youtubeUrl: 'https://www.youtube.com/watch?v=A8riYqmAYck',
      youtubeVideoId: 'A8riYqmAYck',
      title: 'LEMAX 商业代表团：推进尼日利亚先进制造与工程装备投资',
      eventName: '工业重装与资本落地座谈',
      eventDate: '2026-09-22',
      description: '推进重型工程装备落地尼日利亚，共建现代化工业示范园区与技术人才培训基地。',
      thumbnailUrl: 'https://img.youtube.com/vi/A8riYqmAYck/maxresdefault.jpg',
      category: 'Industrial Cooperation',
      tags: '机械装备, 工业园区, 实体投资',
      displayOrder: 3,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 4,
      youtubeUrl: 'https://www.youtube.com/watch?v=M-ECrNzhg9k',
      youtubeVideoId: 'M-ECrNzhg9k',
      title: '中非经贸要闻专访：菲利斯蒂太阳能营销总监刘振峰先生深度对话',
      eventName: '非洲中国会长论坛2026全球峰会',
      eventDate: '2026-09-18',
      description: '官方高端双边访谈，重点展示中非清洁能源合作与绿色制造走廊的战略落地。',
      thumbnailUrl: 'https://img.youtube.com/vi/M-ECrNzhg9k/maxresdefault.jpg',
      category: 'Energy & Infrastructure',
      tags: '太阳能, 清洁能源, 战略对话',
      displayOrder: 4,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 5,
      youtubeUrl: 'https://www.youtube.com/watch?v=Fht3EBzPWCw',
      youtubeVideoId: 'Fht3EBzPWCw',
      title: '尼日利亚与中国新能源合作在拉各斯新能源博览会上成为瞩目焦点',
      eventName: '拉各斯新能源博览会与双边峰会',
      eventDate: '2026-09-18',
      description: '拉各斯首届尼中清洁能源博览会盛况，聚焦双边技术转移与重大电网投资。',
      thumbnailUrl: 'https://img.youtube.com/vi/Fht3EBzPWCw/maxresdefault.jpg',
      category: 'Energy & Infrastructure',
      tags: '能源合作, 拉各斯博览会, 双边经贸',
      displayOrder: 5,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 6,
      youtubeUrl: 'https://www.youtube.com/watch?v=YGiA9rLG2yw',
      youtubeVideoId: 'YGiA9rLG2yw',
      title: '领航非中制度化合作：非洲中国会长论坛如何塑造战略伙伴关系未来',
      eventName: '论坛机制化建设与2026全非峰会',
      eventDate: '2026-09-14',
      description: '全景呈现非洲中国会长论坛常设机构使命、十二大产业行动走廊及阿布贾成立大会战略格局。',
      thumbnailUrl: 'https://img.youtube.com/vi/YGiA9rLG2yw/maxresdefault.jpg',
      category: 'Strategic Partnerships',
      tags: '全非峰会, 机制化合作, 重点走廊',
      displayOrder: 6,
      featured: true,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 7,
      youtubeUrl: 'https://www.youtube.com/watch?v=_ceFSy4QenU',
      youtubeVideoId: '_ceFSy4QenU',
      title: '科技赋能现代农业：尼日利亚农业产业迎跨越式升级',
      eventName: '现代农业科技与粮食安全倡议',
      eventDate: '2026-07-17',
      description: '展示智能农机装备、粮食规模化精深加工及中非农业跨境投资走廊。',
      thumbnailUrl: 'https://img.youtube.com/vi/_ceFSy4QenU/maxresdefault.jpg',
      category: 'Agricultural Technology',
      tags: '智慧农业, 粮食安全, 农机装备',
      displayOrder: 7,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 8,
      youtubeUrl: 'https://www.youtube.com/watch?v=htiGMMBc988',
      youtubeVideoId: 'htiGMMBc988',
      title: '战略伙伴引领未来：尼日利亚清洁能源与绿电走廊发展规划',
      eventName: '清洁能源与微电网基础设施',
      eventDate: '2026-07-10',
      description: '中非双边绿电基础设施投资路线图，推进分布式光伏与工业离网发电。',
      thumbnailUrl: 'https://img.youtube.com/vi/htiGMMBc988/maxresdefault.jpg',
      category: 'Energy & Infrastructure',
      tags: '光伏微网, 绿色电力, 能源转型',
      displayOrder: 8,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 9,
      youtubeUrl: 'https://www.youtube.com/watch?v=G-Q3DiVMDfg',
      youtubeVideoId: 'G-Q3DiVMDfg',
      title: '郑晓鹏大酋长接待中国钢铁工业代表团，推动尼日利亚重工业升级',
      eventName: '中非冶金钢铁产业代表团对接会',
      eventDate: '2026-07-06',
      description: '在阿布贾总部接待中国大型钢铁冶金领军企业代表团，推进本土化钢铁冶炼基地建设。',
      thumbnailUrl: 'https://img.youtube.com/vi/G-Q3DiVMDfg/maxresdefault.jpg',
      category: 'Industrial Cooperation',
      tags: '钢铁冶金, 工业化重器, 产业转移',
      displayOrder: 9,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
    {
      id: 10,
      youtubeUrl: 'https://www.youtube.com/watch?v=_xBgmuhVerw',
      youtubeVideoId: '_xBgmuhVerw',
      title: '非洲中国会长论坛与 Parallex 商业银行达成战略对话，赋能中非双边跨境清算',
      eventName: '跨境金融结算与贸易便利化对接',
      eventDate: '2026-07-03',
      description: '论坛领导层与 Parallex 银行高管共商双边本币清算、贸易信贷与跨境资金合规通道。',
      thumbnailUrl: 'https://img.youtube.com/vi/_xBgmuhVerw/maxresdefault.jpg',
      category: 'Finance & Bilateral Trade',
      tags: '金融结算, Parallex Bank, 跨境贸易',
      displayOrder: 10,
      featured: false,
      status: 'published',
      createdByName: 'ACCBCF 融媒体中心',
    },
  ],
  fr: [],
  ar: [],
  pt: [],
};

// Populate other locales with sensible fallbacks
['fr', 'ar', 'pt'].forEach((loc) => {
  FALLBACK_VIDEOS[loc as Locale] = FALLBACK_VIDEOS.en;
});

/**
 * Server-side data retriever for published videos.
 * Automatically synchronizes with the official YouTube channel RSS feed,
 * merges any CMS overrides, and provides robust offline fallback.
 */
export async function getPublishedVideos(options?: {
  locale?: Locale;
  limit?: number;
  featuredOnly?: boolean;
}): Promise<VideoItem[]> {
  const locale: Locale = options?.locale || 'en';
  const limit = options?.limit || 20;

  // 1. Try to fetch live videos from the official YouTube channel feed (auto-synced!)
  let liveYouTubeVideos: VideoItem[] = [];
  try {
    liveYouTubeVideos = await fetchLiveYouTubeChannelVideos(locale);
  } catch (err) {
    console.warn('[videoService] Live YouTube channel sync failed:', err);
  }

  // 2. Try to fetch manual database / Payload CMS records
  let dbVideos: VideoItem[] = [];
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
      dbVideos = videosResult.docs.map((doc: any) => {
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
    // CMS is optional when offline or using live feed
  }

  // 3. Merge Strategy:
  // - Prefer live YouTube feed entries (which auto-update when a new video drops on YouTube!)
  // - Overlay any custom CMS DB edits (matching by youtubeVideoId)
  // - If live feed returned 0 items, fallback to pre-populated FALLBACK_VIDEOS
  const fallback = FALLBACK_VIDEOS[locale] || FALLBACK_VIDEOS.en;
  const basePool = liveYouTubeVideos.length > 0 ? liveYouTubeVideos : fallback;

  // Create a map to deduplicate and overlay DB records
  const mergedMap = new Map<string, VideoItem>();

  // Insert base pool
  basePool.forEach((v) => {
    if (v.youtubeVideoId) {
      mergedMap.set(v.youtubeVideoId, v);
    }
  });

  // Overlay DB videos (they have priority for manual edits)
  dbVideos.forEach((v) => {
    if (v.youtubeVideoId) {
      mergedMap.set(v.youtubeVideoId, {
        ...(mergedMap.get(v.youtubeVideoId) || {}),
        ...v,
      });
    } else {
      mergedMap.set(`db-${v.id}`, v);
    }
  });

  let result = Array.from(mergedMap.values());

  // Sort by display order or recency
  result.sort((a, b) => a.displayOrder - b.displayOrder);

  if (options?.featuredOnly) {
    const featured = result.filter((v) => v.featured);
    return featured.length > 0 ? featured.slice(0, limit) : result.slice(0, 1);
  }

  return result.slice(0, limit);
}
