import { MetadataRoute } from 'next';
import { SAMPLE_NEWS, CORE_SERVICES, PRIORITY_SECTORS } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://africachinachairmenforum.org';
  const locales = ['en', 'zh'];
  const routes = ['', '/about', '/governance', '/programs', '/sectors', '/news', '/events', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/news' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    for (const post of SAMPLE_NEWS) {
      entries.push({
        url: `${baseUrl}/${locale}/news/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
