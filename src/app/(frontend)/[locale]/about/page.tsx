import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Eye, Compass, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import { SITE_INFO } from '@/lib/content';
import type { Locale } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  return {
    title: locale === 'zh' ? '关于论坛' : 'About ACCBCF',
    description: SITE_INFO.about[locale],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const isZh = locale === 'zh';

  return (
    <div className="pt-24 pb-20">
      {/* Banner */}
      <section className="bg-accbcf-blue-deep text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40">
            <Shield className="w-3.5 h-3.5" />
            <span>{isZh ? '官方概述' : 'Institutional Profile'}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            {isZh ? '关于非中企业领袖论坛' : 'About ACCBCF'}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {SITE_INFO.slogan[locale]}
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4 text-accbcf-charcoal">
            <span className="text-xs font-bold uppercase tracking-widest text-accbcf-blue">
              {isZh ? '历史使命与创立背景' : 'Founding & Sovereign Context'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              {isZh ? '打造高水准非中制度化合作新地标' : 'Institutionalized Bilateral Cooperation for a Shared Future'}
            </h2>
            <p className="text-accbcf-gray text-sm sm:text-base leading-relaxed">
              {SITE_INFO.about[locale]}
            </p>
            <div className="p-4 rounded-xl bg-accbcf-light border border-gray-200 text-xs text-accbcf-charcoal space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-accbcf-blue">
                <MapPin className="w-4 h-4 text-accbcf-gold" />
                <span>{isZh ? '常设机构驻地' : 'Secretariat Headquarters'}</span>
              </p>
              <p className="text-accbcf-gray">{SITE_INFO.hqAddress[locale]}</p>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden bg-accbcf-light p-4 shadow-xl border-4 border-accbcf-gold/40 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/accbcf-emblem.jpg"
                  alt="ACCBCF Seal"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-accbcf-blue/10 flex items-center justify-center text-accbcf-blue">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-accbcf-charcoal">
              {isZh ? '愿景' : 'Our Vision'}
            </h3>
            <p className="text-accbcf-gray text-sm leading-relaxed">
              {SITE_INFO.vision[locale]}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-accbcf-gold/20 flex items-center justify-center text-accbcf-gold-dark">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-accbcf-charcoal">
              {isZh ? '使命' : 'Our Mission'}
            </h3>
            <p className="text-accbcf-gray text-sm leading-relaxed">
              {SITE_INFO.mission[locale]}
            </p>
          </div>
        </div>

        <div className="bg-accbcf-blue text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accbcf-gold">
            {isZh ? '五大核心行动准则' : 'The Five Guiding Principles'}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            {isZh ? '指导论坛所有经贸活动的最高准则' : 'Principles Guiding Every ACCBCF Engagement'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {SITE_INFO.guidingPrinciples.map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/15 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accbcf-gold flex-shrink-0" />
                <span className="font-serif font-bold text-sm">{p[locale]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-accbcf-light border border-gray-200 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-accbcf-blue">
            {isZh ? '未来展望' : 'Future Strategic Outlook'}
          </span>
          <h3 className="font-serif text-2xl font-bold text-accbcf-charcoal">
            {isZh ? '以阿布贾为枢纽 · 持续推进深层经贸互联' : 'Strengthening Abuja as the Strategic Continental Bridge'}
          </h3>
          <p className="text-accbcf-gray text-sm sm:text-base leading-relaxed">
            {SITE_INFO.futureOutlook[locale]}
          </p>
          <div className="pt-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-blue text-white hover:bg-accbcf-blue-dark transition-colors"
            >
              <span>{isZh ? '与常设秘书处联系' : 'Connect With The Secretariat'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
