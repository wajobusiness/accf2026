import React from 'react';
import type { Locale } from '@/lib/content';
import { Hero } from '@/components/home/Hero';
import { FeaturedVideoSection } from '@/components/home/FeaturedVideoSection';
import { CredibilityStrip } from '@/components/home/CredibilityStrip';
import { AboutSnapshot } from '@/components/home/AboutSnapshot';
import { StrategicPositioning } from '@/components/home/StrategicPositioning';
import { SectorsGrid } from '@/components/home/SectorsGrid';
import { AdvantagesGrid } from '@/components/home/AdvantagesGrid';
import { LatestNews } from '@/components/home/LatestNews';
import { ContactCtaBand } from '@/components/home/ContactCtaBand';

import { normalizeLocale } from '@/lib/content';
import { getPublishedNews } from '@/lib/newsService';
import { getPublishedVideos } from '@/lib/videoService';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const [newsArticles, featuredVideos] = await Promise.all([
    getPublishedNews({ locale, limit: 9 }),
    getPublishedVideos({ locale, limit: 1, featuredOnly: true }),
  ]);
  const featuredVideo = featuredVideos[0];

  return (
    <>
      <Hero locale={locale} />
      <FeaturedVideoSection locale={locale} featuredVideo={featuredVideo} />
      <CredibilityStrip locale={locale} />
      <AboutSnapshot locale={locale} />
      <StrategicPositioning locale={locale} />
      <SectorsGrid locale={locale} />
      <AdvantagesGrid locale={locale} />
      <LatestNews locale={locale} initialNews={newsArticles} />
      <ContactCtaBand locale={locale} />
    </>
  );
}
