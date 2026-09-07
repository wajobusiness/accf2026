import React from 'react';
import type { Locale } from '@/lib/content';
import { Hero } from '@/components/home/Hero';
import { CredibilityStrip } from '@/components/home/CredibilityStrip';
import { AboutSnapshot } from '@/components/home/AboutSnapshot';
import { StrategicPositioning } from '@/components/home/StrategicPositioning';
import { SectorsGrid } from '@/components/home/SectorsGrid';
import { AdvantagesGrid } from '@/components/home/AdvantagesGrid';
import { LatestNews } from '@/components/home/LatestNews';
import { ContactCtaBand } from '@/components/home/ContactCtaBand';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';

  return (
    <>
      <Hero locale={locale} />
      <CredibilityStrip locale={locale} />
      <AboutSnapshot locale={locale} />
      <StrategicPositioning locale={locale} />
      <SectorsGrid locale={locale} />
      <AdvantagesGrid locale={locale} />
      <LatestNews locale={locale} />
      <ContactCtaBand locale={locale} />
    </>
  );
}
