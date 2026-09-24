import { Locale } from './content';

export interface PageSeoItem {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface SiteSeoConfig {
  siteName: string;
  titleTemplate: string;
  defaultMetaDescription: string;
  defaultKeywords: string;
  canonicalBaseUrl: string;
  ogImageUrl: string;
  twitterCardType: 'summary_large_image' | 'summary';
  twitterHandle: string;
  // Verification
  googleVerification?: string;
  bingVerification?: string;
  baiduVerification?: string;
  yandexVerification?: string;
  googleAnalyticsId?: string;
  baiduTongjiId?: string;
  // Page specific overrides
  pages?: {
    home?: PageSeoItem;
    about?: PageSeoItem;
    founders?: PageSeoItem;
    governance?: PageSeoItem;
    programs?: PageSeoItem;
    sectors?: PageSeoItem;
    events?: PageSeoItem;
    news?: PageSeoItem;
    contact?: PageSeoItem;
  };
  // Structured Data
  orgLegalName: string;
  orgAlternateName: string;
  orgType: string;
  contactPointTelephone: string;
  contactPointEmail: string;
  indexingDirective: string;
}

export const DEFAULT_SEO_CONFIG: Record<Locale, SiteSeoConfig> = {
  en: {
    siteName: 'Africa China Chairmen of Business Forum (ACCBCF)',
    titleTemplate: '%s | Africa China Chairmen of Business Forum',
    defaultMetaDescription:
      'Official platform connecting African and Chinese governments, business leadership, and capital. Headquartered at the Federal Ministry of Industry, Trade and Investment in Abuja, Nigeria.',
    defaultKeywords:
      'ACCBCF, Africa China Chairmen of Business Forum, 非洲中国会长论坛, China Africa Trade, Abuja HQ, FMITI Nigeria, G2G, G2B, B2B, B2C, Investment in Africa',
    canonicalBaseUrl: 'https://www.africachinachairmenforum.com',
    ogImageUrl: '/images/accbcf-emblem.jpg',
    twitterCardType: 'summary_large_image',
    twitterHandle: '@accbcf_official',
    orgLegalName: 'Africa China Chairmen of Business Forum',
    orgAlternateName: '非洲中国会长论坛 (ACCBCF)',
    orgType: 'GovernmentOrganization',
    contactPointTelephone: '+234 916 016 6906',
    contactPointEmail: 'africachinachairmenforum@gmail.com',
    indexingDirective: 'index, follow',
    pages: {
      home: {
        title: 'Africa China Chairmen of Business Forum · Abuja HQ',
        description: 'Connecting Governments · Empowering Business · Creating Shared Prosperity across Africa and China.',
      },
      about: {
        title: 'About ACCBCF · Vision, Mandate & Strategic Positioning',
        description: 'Explore the founding history, institutional mandate, and high-level bilateral governance of ACCBCF.',
      },
      founders: {
        title: 'Founders & Diplomatic Leadership · ACCBCF',
        description: 'Official profiles of National Chairman Chief Yousuf Mike Ugwu and Co-Founder Madam Wu Zhiying.',
      },
      governance: {
        title: 'Institutional Governance & Leadership Council · ACCBCF',
        description: 'Explore our 8 functional directorates, 7 sectoral committees, and organizational leadership structure.',
      },
      programs: {
        title: 'Programs & Core Services · ACCBCF',
        description: 'High-impact trade missions, market access matchmaking, and bilateral investment facilitation.',
      },
      sectors: {
        title: '12 Priority Economic Sectors · ACCBCF',
        description: 'Strategic cooperation sectors across clean energy, agriculture, mining, infrastructure, and technology transfer.',
      },
      events: {
        title: 'Summits, Business Dialogues & Events · ACCBCF',
        description: 'Official bilateral summits, business expos, YouTube video archives, and upcoming forum gatherings.',
      },
      news: {
        title: 'Official News & Strategic Dispatches · ACCBCF',
        description: 'Latest communiqués, policy analyses, bilateral summit briefings, and industrial updates.',
      },
      contact: {
        title: 'Connect with Secretariat · ACCBCF Abuja',
        description: 'Submit diplomatic inquiries, strategic project proposals, and bilateral partnership requests.',
      },
    },
  },
  zh: {
    siteName: '非洲中国会长论坛 (ACCBCF)',
    titleTemplate: '%s | 非洲中国会长论坛 (ACCBCF)',
    defaultMetaDescription:
      '链接非洲与中国主权政府、领军企业及金融资本的官方经贸合作平台。总部设于尼日利亚联邦工业、贸易和投资部大院内。',
    defaultKeywords:
      '非洲中国会长论坛, ACCBCF, 非中经贸合作, 阿布贾总部, 尼日利亚工贸投部, G2G主权对接, G2B政企联动, B2B产业协同, 非洲投资',
    canonicalBaseUrl: 'https://www.africachinachairmenforum.com',
    ogImageUrl: '/images/accbcf-emblem.jpg',
    twitterCardType: 'summary_large_image',
    twitterHandle: '@accbcf_official',
    orgLegalName: 'Africa China Chairmen of Business Forum',
    orgAlternateName: '非洲中国会长论坛 (ACCBCF)',
    orgType: 'GovernmentOrganization',
    contactPointTelephone: '+234 916 016 6906',
    contactPointEmail: 'africachinachairmenforum@gmail.com',
    indexingDirective: 'index, follow',
    pages: {
      home: {
        title: '非洲中国会长论坛 · 链接政府 · 赋能企业 · 共创繁荣',
        description: '高能级非中双边经贸协作新引擎，立足阿布贾，辐射全非，链接全球。',
      },
      about: {
        title: '关于论坛 · 机构宗旨与战略定位 · 非洲中国会长论坛',
        description: '深入了解论坛历史沿革、双边制度化使命及四大战略合作模式。',
      },
      founders: {
        title: '创会领袖与联合发起人履历 · 非洲中国会长论坛',
        description: '创会全国主席迈克·乌格武酋长与联合发起人吴芷莹女士履历与战略愿景。',
      },
      governance: {
        title: '组织治理架构与领导集体 · 非洲中国会长论坛',
        description: '八大专业职能司局与七大重点产业行动委员会组织架构解析。',
      },
      programs: {
        title: '综合服务体系与核心重大项目 · 非洲中国会长论坛',
        description: '高层政企代表团、属地准入对接与投资落地全流程赋能服务。',
      },
      sectors: {
        title: '非中经贸合作十二大重点产业 · 非洲中国会长论坛',
        description: '聚焦清洁能源、现代农业、矿业深加工、智能制造与基础设施互联互通。',
      },
      events: {
        title: '重要会议、高层峰会与视频专区 · 非洲中国会长论坛',
        description: '官方双边盛会日程、签约仪式现场与YouTube官方频道视频实况。',
      },
      news: {
        title: '官方要闻与双边经贸动态 · 非洲中国会长论坛',
        description: '最新官方新闻公告、双边经贸考察纪要与政策动向权威解读。',
      },
      contact: {
        title: '联络论坛常设秘书处 · 非洲中国会长论坛',
        description: '递交经贸合作意向书、双边政企考察邀请或战略投资需求。',
      },
    },
  },
  fr: {
    siteName: 'Forum des Présidents d’Entreprises Afrique–Chine (ACCBCF)',
    titleTemplate: '%s | Forum des Présidents d’Entreprises Afrique–Chine',
    defaultMetaDescription:
      'Plateforme officielle reliant gouvernements africains et chinois, dirigeants d’entreprises et capitaux. Siège à Abuja, Nigeria.',
    defaultKeywords:
      'ACCBCF, Forum Afrique Chine, Commerce Afrique Chine, Abuja, Investissement Afrique, G2G, G2B, B2B',
    canonicalBaseUrl: 'https://www.africachinachairmenforum.com',
    ogImageUrl: '/images/accbcf-emblem.jpg',
    twitterCardType: 'summary_large_image',
    twitterHandle: '@accbcf_official',
    orgLegalName: 'Africa China Chairmen of Business Forum',
    orgAlternateName: 'Forum des Présidents d’Entreprises Afrique–Chine (ACCBCF)',
    orgType: 'GovernmentOrganization',
    contactPointTelephone: '+234 916 016 6906',
    contactPointEmail: 'africachinachairmenforum@gmail.com',
    indexingDirective: 'index, follow',
  },
  ar: {
    siteName: 'منتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية (ACCBCF)',
    titleTemplate: '%s | منتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية',
    defaultMetaDescription:
      'المنصة الرسمية المعتمدة لربط الحكومات الإفريقية والصينية، وقيادات الأعمال، ورؤوس الأموال. المقر في أبوجا، نيجيريا.',
    defaultKeywords:
      'ACCBCF, منتدى الأعمال الإفريقي الصيني, التجارة الإفريقية الصينية, أبوجا, نيجيريا, الاستثمار في إفريقيا',
    canonicalBaseUrl: 'https://www.africachinachairmenforum.com',
    ogImageUrl: '/images/accbcf-emblem.jpg',
    twitterCardType: 'summary_large_image',
    twitterHandle: '@accbcf_official',
    orgLegalName: 'Africa China Chairmen of Business Forum',
    orgAlternateName: 'منتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية (ACCBCF)',
    orgType: 'GovernmentOrganization',
    contactPointTelephone: '+234 916 016 6906',
    contactPointEmail: 'africachinachairmenforum@gmail.com',
    indexingDirective: 'index, follow',
  },
  pt: {
    siteName: 'Fórum de Presidentes de Negócios África–China (ACCBCF)',
    titleTemplate: '%s | Fórum de Presidentes de Negócios África–China',
    defaultMetaDescription:
      'Plataforma oficial que conecta governos africanos e chinês, lideranças empresariais e capitais. Sede em Abuja, Nigéria.',
    defaultKeywords:
      'ACCBCF, Fórum África China, Comércio África China, Abuja, Nigéria, Investimento África, G2G, G2B, B2B',
    canonicalBaseUrl: 'https://www.africachinachairmenforum.com',
    ogImageUrl: '/images/accbcf-emblem.jpg',
    twitterCardType: 'summary_large_image',
    twitterHandle: '@accbcf_official',
    orgLegalName: 'Africa China Chairmen of Business Forum',
    orgAlternateName: 'Fórum de Presidentes de Negócios África–China (ACCBCF)',
    orgType: 'GovernmentOrganization',
    contactPointTelephone: '+234 916 016 6906',
    contactPointEmail: 'africachinachairmenforum@gmail.com',
    indexingDirective: 'index, follow',
  },
};

/**
 * Server-side helper to fetch SEO settings from Payload CMS with graceful fallback.
 */
export async function getSiteSeoSettings(locale: Locale = 'en'): Promise<SiteSeoConfig> {
  const fallback = DEFAULT_SEO_CONFIG[locale] || DEFAULT_SEO_CONFIG.en;

  try {
    const { getPayload } = await import('payload');
    const configModule = await import('@/payload.config');
    const payload = await getPayload({ config: configModule.default });

    const cmsSeo = (await (payload as any).findGlobal({
      slug: 'seoSettings',
      locale,
      fallbackLocale: 'en',
    })) as any;

    if (cmsSeo) {
      let ogImage = fallback.ogImageUrl;
      if (cmsSeo.ogImage && typeof cmsSeo.ogImage === 'object' && cmsSeo.ogImage.url) {
        ogImage = cmsSeo.ogImage.url;
      } else if (cmsSeo.ogImageUrl) {
        ogImage = cmsSeo.ogImageUrl;
      }

      return {
        siteName: cmsSeo.siteName || fallback.siteName,
        titleTemplate: cmsSeo.titleTemplate || fallback.titleTemplate,
        defaultMetaDescription: cmsSeo.defaultMetaDescription || fallback.defaultMetaDescription,
        defaultKeywords: cmsSeo.defaultKeywords || fallback.defaultKeywords,
        canonicalBaseUrl: cmsSeo.canonicalBaseUrl || fallback.canonicalBaseUrl,
        ogImageUrl: ogImage,
        twitterCardType: cmsSeo.twitterCardType || fallback.twitterCardType,
        twitterHandle: cmsSeo.twitterHandle || fallback.twitterHandle,
        googleVerification: cmsSeo.googleVerification || undefined,
        bingVerification: cmsSeo.bingVerification || undefined,
        baiduVerification: cmsSeo.baiduVerification || undefined,
        yandexVerification: cmsSeo.yandexVerification || undefined,
        googleAnalyticsId: cmsSeo.googleAnalyticsId || undefined,
        baiduTongjiId: cmsSeo.baiduTongjiId || undefined,
        pages: {
          home: cmsSeo.homeSeo || fallback.pages?.home,
          about: cmsSeo.aboutSeo || fallback.pages?.about,
          founders: cmsSeo.foundersSeo || fallback.pages?.founders,
          governance: cmsSeo.governanceSeo || fallback.pages?.governance,
          programs: cmsSeo.programsSeo || fallback.pages?.programs,
          sectors: cmsSeo.sectorsSeo || fallback.pages?.sectors,
          events: cmsSeo.eventsSeo || fallback.pages?.events,
          news: cmsSeo.newsSeo || fallback.pages?.news,
          contact: cmsSeo.contactSeo || fallback.pages?.contact,
        },
        orgLegalName: cmsSeo.orgLegalName || fallback.orgLegalName,
        orgAlternateName: cmsSeo.orgAlternateName || fallback.orgAlternateName,
        orgType: cmsSeo.orgType || fallback.orgType,
        contactPointTelephone: cmsSeo.contactPointTelephone || fallback.contactPointTelephone,
        contactPointEmail: cmsSeo.contactPointEmail || fallback.contactPointEmail,
        indexingDirective: cmsSeo.indexingDirective || fallback.indexingDirective,
      };
    }
  } catch {
    // Graceful fallback for offline build or before CMS initialization
  }

  return fallback;
}

/**
 * Generate Schema.org JSON-LD Structured Data for the entire organization and website.
 */
export function generateOrganizationJsonLd(config: SiteSeoConfig, locale: Locale = 'en') {
  const isZh = locale === 'zh';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': config.orgType || 'GovernmentOrganization',
        '@id': `${config.canonicalBaseUrl}/#organization`,
        name: config.siteName,
        legalName: config.orgLegalName,
        alternateName: [
          'ACCBCF',
          'Africa China Chairmen of Business Forum',
          '非洲中国会长论坛',
          'Forum des Présidents d’Entreprises Afrique-Chine',
        ],
        url: config.canonicalBaseUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${config.canonicalBaseUrl}/#logo`,
          url: `${config.canonicalBaseUrl}/images/accbcf-emblem.jpg`,
          caption: config.siteName,
        },
        image: `${config.canonicalBaseUrl}/images/accbcf-emblem.jpg`,
        description: config.defaultMetaDescription,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Block D, Federal Ministry of Industry, Trade and Investment, Old Federal Secretariat, Area 1, Garki',
          addressLocality: 'Abuja',
          addressRegion: 'Federal Capital Territory',
          postalCode: '900103',
          addressCountry: 'NG',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: config.contactPointTelephone,
            contactType: 'Diplomatic & Trade Secretariat Desk',
            email: config.contactPointEmail,
            availableLanguage: ['English', 'Chinese', 'French', 'Arabic', 'Portuguese'],
          },
        ],
        sameAs: [
          'https://youtube.com/@africachinachairmenforum',
          'https://twitter.com/accbcf_official',
          'https://linkedin.com/company/accbcf',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${config.canonicalBaseUrl}/#website`,
        url: config.canonicalBaseUrl,
        name: config.siteName,
        description: config.defaultMetaDescription,
        publisher: {
          '@id': `${config.canonicalBaseUrl}/#organization`,
        },
        inLanguage: [
          { '@type': 'Language', name: 'English', alternateName: 'en' },
          { '@type': 'Language', name: 'Chinese', alternateName: 'zh' },
          { '@type': 'Language', name: 'French', alternateName: 'fr' },
          { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
          { '@type': 'Language', name: 'Portuguese', alternateName: 'pt' },
        ],
      },
    ],
  };
}

