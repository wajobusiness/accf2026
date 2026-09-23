import React from 'react';
import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { UI_STRINGS } from '@/lib/translations';
import { OrgChart } from '@/components/governance/OrgChart';
import type { Locale } from '@/lib/content';
import { normalizeLocale } from '@/lib/content';
import { getSiteSeoSettings } from '@/lib/seoService';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const seo = await getSiteSeoSettings(locale);
  const pageSeo = seo.pages?.governance;

  return {
    title: pageSeo?.title || (locale === 'zh' ? '组织治理架构与领导集体 · 非洲中国会长论坛' : 'Institutional Governance & Leadership Council · ACCBCF'),
    description: pageSeo?.description || 'ACCBCF institutional governance structure, Board of Directors, and committees.',
  };
}

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const t = UI_STRINGS[locale].governancePage;

  return (
    <div className="pt-24 pb-20">
      <section className="bg-accbcf-blue-deep text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40">
            <Shield className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold">
            <span className="inline-block bg-accbcf-gold text-accbcf-charcoal px-5 py-1.5 sm:px-7 sm:py-2 font-serif font-bold shadow-md">
              {t.title}
            </span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      <OrgChart locale={locale} />
    </div>
  );
}
