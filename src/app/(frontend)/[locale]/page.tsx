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

import type { Metadata } from 'next';
import { normalizeLocale } from '@/lib/content';
import { getPublishedNews } from '@/lib/newsService';
import { getPublishedVideos } from '@/lib/videoService';
import { getSiteSeoSettings } from '@/lib/seoService';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const seo = await getSiteSeoSettings(locale);
  const homeSeo = seo.pages?.home;

  const title = homeSeo?.title || seo.siteName;
  const description = homeSeo?.description || seo.defaultMetaDescription;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: homeSeo?.keywords || seo.defaultKeywords,
    openGraph: {
      title,
      description,
      url: `${seo.canonicalBaseUrl}/${locale}`,
      siteName: seo.siteName,
      images: [
        {
          url: seo.ogImageUrl || '/images/accbcf-emblem.jpg',
          width: 1200,
          height: 630,
          alt: seo.siteName,
        },
      ],
    },
  };
}

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
