import { Locale, SAMPLE_NEWS } from './content';

export interface EditorInfo {
  id: string;
  name: string;
  designation: string;
  avatar?: string;
  totalPosts: number;
}

export interface NewsSeo {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface NewsArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  imageCaption?: string;
  excerpt: string;
  content: string;
  author: EditorInfo;
  seo?: NewsSeo;
  featured?: boolean;
}

// Default verified editorial desk anchors with simulated post counts
export const DEFAULT_EDITORS: Record<string, EditorInfo> = {
  default: {
    id: 'editor-abuja',
    name: 'Dr. Aliko Bello',
    designation: 'Chief Diplomatic Correspondent · Abuja Bureau',
    avatar: '/images/accbcf-emblem.jpg',
    totalPosts: 12,
  },
  dialogue: {
    id: 'editor-trade',
    name: 'Zhang Wei',
    designation: 'Senior Asia-Pacific Trade Analyst · Bilateral Desk',
    avatar: '/images/accbcf-emblem.jpg',
    totalPosts: 8,
  },
  mining: {
    id: 'editor-resources',
    name: 'Engr. Chukwuma Obi',
    designation: 'Critical Minerals & Infrastructure Specialist',
    avatar: '/images/accbcf-emblem.jpg',
    totalPosts: 5,
  },
};

/**
 * Returns fallback sample articles mapped to full NewsArticleItem structure
 */
export function getFallbackArticles(locale: Locale): NewsArticleItem[] {
  return SAMPLE_NEWS.map((item, idx) => {
    const editorKey = idx === 0 ? 'default' : idx === 1 ? 'dialogue' : 'mining';
    const editor = DEFAULT_EDITORS[editorKey] || DEFAULT_EDITORS.default;

    return {
      id: item.id,
      slug: item.slug,
      title: item.title[locale] || item.title.en,
      category: item.category[locale] || item.category.en,
      date: item.date,
      readTime: item.readTime[locale] || item.readTime.en,
      image: item.image,
      imageCaption:
        locale === 'zh'
          ? '阿布贾联邦秘书处官方发布现场'
          : 'Official Bilateral Secretariat Protocol, Abuja, Nigeria',
      excerpt: item.excerpt[locale] || item.excerpt.en,
      content: item.content[locale] || item.content.en,
      author: editor,
      featured: true,
      seo: {
        metaTitle: item.title[locale] || item.title.en,
        metaDescription: item.excerpt[locale] || item.excerpt.en,
        metaKeywords: 'ACCBCF, China Africa Trade, Abuja Summit, Bilateral Investment',
        ogImage: item.image,
      },
    };
  });
}

