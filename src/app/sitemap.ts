import { MetadataRoute } from 'next';
import { PRIORITY_SECTORS } from '@/lib/content';
import { getAllNewsSlugs } from '@/lib/newsService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.africachinachairmenforum.com';
  const locales = ['en', 'zh', 'fr', 'ar', 'pt'];
  const staticRoutes = [
    '',
    '/about',
    '/founders',
    '/governance',
    '/programs',
    '/sectors',
    '/events',
    '/news',
    '/contact',
  ];

  const entries: MetadataRoute.Sitemap = [];
  const newsSlugs = await getAllNewsSlugs();

  for (const locale of locales) {
    // 1. Static Core Pages
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/news' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/events' || route === '/news' ? 0.9 : 0.8,
      });
    }

    // 2. Dynamic 12 Priority Sector Detail Pages
    for (const sec of PRIORITY_SECTORS) {
      entries.push({
        url: `${baseUrl}/${locale}/sectors/${sec.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    }

    // 3. Dynamic News Articles
    for (const slug of newsSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/news/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
