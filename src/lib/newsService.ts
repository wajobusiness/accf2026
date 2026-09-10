import { Locale, SAMPLE_NEWS } from './content';
import {
  EditorInfo,
  NewsSeo,
  NewsArticleItem,
  DEFAULT_EDITORS,
  getFallbackArticles,
} from './newsTypes';

export type { EditorInfo, NewsSeo, NewsArticleItem };
export { DEFAULT_EDITORS, getFallbackArticles };

/**
 * Server-side function to retrieve published news from Payload CMS,
 * falling back seamlessly to institutional sample articles.
 */
export async function getPublishedNews(options?: {
  locale?: Locale;
  limit?: number;
  featuredOnly?: boolean;
}): Promise<NewsArticleItem[]> {
  const locale: Locale = options?.locale || 'en';
  const limit = options?.limit || 12;

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

    const postsResult = await payload.find({
      collection: 'posts',
      where: whereClause,
      sort: '-publishedDate',
      limit,
      depth: 2,
      locale,
      fallbackLocale: 'en',
    });

    if (postsResult.docs && postsResult.docs.length > 0) {
      // Calculate author counts for accurate stats
      const editorCountCache = new Map<string, number>();

      const parsedDocs: NewsArticleItem[] = [];

      for (const doc of postsResult.docs as any[]) {
        let editorId = 'editor-secretariat';
        let editorName = doc.authorName || 'ACCBCF Secretariat';
        let editorDesignation = 'Official Secretariat Desk';
        let editorAvatar: string | undefined = undefined;
        let totalPosts = 1;

        if (doc.author && typeof doc.author === 'object') {
          const userObj = doc.author;
          editorId = userObj.id || editorId;
          editorName = userObj.name || editorName;
          editorDesignation = userObj.designation || 'Contributing News Correspondent';

          if (userObj.avatar && typeof userObj.avatar === 'object' && userObj.avatar.url) {
            editorAvatar = userObj.avatar.url;
          } else if (userObj.avatarUrl) {
            editorAvatar = userObj.avatarUrl;
          }

          if (typeof userObj.postCount === 'number' && userObj.postCount > 0) {
            totalPosts = userObj.postCount;
          } else {
            if (!editorCountCache.has(editorId)) {
              try {
                const countRes = await payload.count({
                  collection: 'posts',
                  where: {
                    author: { equals: editorId },
                    status: { equals: 'published' },
                  },
                });
                editorCountCache.set(editorId, countRes.totalDocs || 1);
              } catch {
                editorCountCache.set(editorId, 1);
              }
            }
            totalPosts = editorCountCache.get(editorId) || 1;
          }
        }

        // Determine image URL
        let imageUrl = doc.featuredImageUrl || '/images/forum/fmiti-headquarters-handshake.jpg';
        if (doc.featuredImage && typeof doc.featuredImage === 'object' && doc.featuredImage.url) {
          imageUrl = doc.featuredImage.url;
        }

        parsedDocs.push({
          id: String(doc.id),
          slug: doc.slug,
          title: typeof doc.title === 'string' ? doc.title : doc.title?.[locale] || doc.slug,
          category: doc.category || 'Institutional News',
          date: doc.publishedDate
            ? new Date(doc.publishedDate).toISOString().split('T')[0]
            : '2026-03-30',
          readTime: typeof doc.readTime === 'string' ? doc.readTime : doc.readTime?.[locale] || '4 min read',
          image: imageUrl,
          imageCaption: typeof doc.imageCaption === 'string' ? doc.imageCaption : doc.imageCaption?.[locale],
          excerpt: typeof doc.excerpt === 'string' ? doc.excerpt : doc.excerpt?.[locale] || '',
          content: typeof doc.body === 'string' ? doc.body : doc.body?.[locale] || '',
          featured: doc.featured,
          author: {
            id: editorId,
            name: editorName,
            designation: editorDesignation,
            avatar: editorAvatar,
            totalPosts,
          },
          seo: {
            metaTitle: doc.seo?.metaTitle || doc.title,
            metaDescription: doc.seo?.metaDescription || doc.excerpt,
            metaKeywords: doc.seo?.metaKeywords,
            ogImage:
              doc.seo?.ogImage?.url || doc.seo?.ogImageUrl || imageUrl,
            canonicalUrl: doc.seo?.canonicalUrl,
            noIndex: doc.seo?.noIndex,
          },
        });
      }

      return parsedDocs;
    }
  } catch (err) {
    // If Payload is not yet initialized or in offline build, gracefully use seed articles
  }

  return getFallbackArticles(locale);
}

/**
 * Retrieve single news article by slug with full author details
 */
export async function getNewsArticleBySlug(
  slug: string,
  locale: Locale = 'en'
): Promise<NewsArticleItem | null> {
  try {
    const { getPayload } = await import('payload');
    const configModule = await import('@/payload.config');
    const payload = await getPayload({ config: configModule.default });

    const postsResult = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 2,
      locale,
      fallbackLocale: 'en',
    });

    if (postsResult.docs && postsResult.docs.length > 0) {
      const doc = postsResult.docs[0] as any;
      let editorId = 'editor-secretariat';
      let editorName = doc.authorName || 'ACCBCF Secretariat';
      let editorDesignation = 'Official Secretariat Desk';
      let editorAvatar: string | undefined = undefined;
      let totalPosts = 1;

      if (doc.author && typeof doc.author === 'object') {
        const userObj = doc.author;
        editorId = userObj.id || editorId;
        editorName = userObj.name || editorName;
        editorDesignation = userObj.designation || 'Contributing News Correspondent';

        if (userObj.avatar && typeof userObj.avatar === 'object' && userObj.avatar.url) {
          editorAvatar = userObj.avatar.url;
        } else if (userObj.avatarUrl) {
          editorAvatar = userObj.avatarUrl;
        }

        if (typeof userObj.postCount === 'number' && userObj.postCount > 0) {
          totalPosts = userObj.postCount;
        } else {
          try {
            const countRes = await payload.count({
              collection: 'posts',
              where: {
                author: { equals: editorId },
                status: { equals: 'published' },
              },
            });
            totalPosts = countRes.totalDocs || 1;
          } catch {
            totalPosts = 1;
          }
        }
      }

      let imageUrl = doc.featuredImageUrl || '/images/forum/fmiti-headquarters-handshake.jpg';
      if (doc.featuredImage && typeof doc.featuredImage === 'object' && doc.featuredImage.url) {
        imageUrl = doc.featuredImage.url;
      }

      return {
        id: String(doc.id),
        slug: doc.slug,
        title: typeof doc.title === 'string' ? doc.title : doc.title?.[locale] || doc.slug,
        category: doc.category || 'Institutional News',
        date: doc.publishedDate
          ? new Date(doc.publishedDate).toISOString().split('T')[0]
          : '2026-03-30',
        readTime: typeof doc.readTime === 'string' ? doc.readTime : doc.readTime?.[locale] || '4 min read',
        image: imageUrl,
        imageCaption: typeof doc.imageCaption === 'string' ? doc.imageCaption : doc.imageCaption?.[locale],
        excerpt: typeof doc.excerpt === 'string' ? doc.excerpt : doc.excerpt?.[locale] || '',
        content: typeof doc.body === 'string' ? doc.body : doc.body?.[locale] || '',
        featured: doc.featured,
        author: {
          id: editorId,
          name: editorName,
          designation: editorDesignation,
          avatar: editorAvatar,
          totalPosts,
        },
        seo: {
          metaTitle: doc.seo?.metaTitle || doc.title,
          metaDescription: doc.seo?.metaDescription || doc.excerpt,
          metaKeywords: doc.seo?.metaKeywords,
          ogImage:
            doc.seo?.ogImage?.url || doc.seo?.ogImageUrl || imageUrl,
          canonicalUrl: doc.seo?.canonicalUrl,
          noIndex: doc.seo?.noIndex,
        },
      };
    }
  } catch (err) {
    // Fallback to sample news
  }

  const fallbackArticles = getFallbackArticles(locale);
  return fallbackArticles.find((p) => p.slug === slug) || null;
}

/**
 * Returns list of all available news slugs across sample and CMS
 */
export async function getAllNewsSlugs(): Promise<string[]> {
  try {
    const { getPayload } = await import('payload');
    const configModule = await import('@/payload.config');
    const payload = await getPayload({ config: configModule.default });

    const postsResult = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 100,
    });

    if (postsResult.docs && postsResult.docs.length > 0) {
      const cmsSlugs = postsResult.docs.map((d: any) => d.slug).filter(Boolean);
      const sampleSlugs = SAMPLE_NEWS.map((p) => p.slug);
      return Array.from(new Set([...cmsSlugs, ...sampleSlugs]));
    }
  } catch {
    // Fallback
  }

  return SAMPLE_NEWS.map((p) => p.slug);
}

