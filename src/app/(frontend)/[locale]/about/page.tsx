import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Eye, Compass, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import { SITE_INFO, normalizeLocale } from '@/lib/content';
import type { Locale } from '@/lib/content';
import { OfficialPhotoArchives } from '@/components/about/OfficialPhotoArchives';
import { ClickableImagePreview } from '@/components/common/ClickableImagePreview';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const titles: Record<Locale, string> = {
    en: 'About ACCBCF',
    zh: '关于论坛',
    fr: 'À propos de l’ACCBCF',
    ar: 'عن المنتدى',
    pt: 'Sobre o ACCBCF',
  };
  return {
    title: titles[locale] || titles.en,
    description: SITE_INFO.about[locale],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
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
          <h1 className="text-3xl sm:text-5xl font-bold">
            <span className="inline-block bg-accbcf-gold text-accbcf-charcoal px-5 py-1.5 sm:px-7 sm:py-2 font-serif font-bold shadow-md">
              {isZh ? '关于非洲中国会长论坛' : 'About ACCBCF'}
            </span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
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
            <ClickableImagePreview
              src="/images/accbcf-emblem.jpg"
              alt="ACCBCF Seal"
              title={isZh ? '非洲中国会长论坛官方徽标与印信' : 'Official ACCBCF Seal & Insignia'}
              caption={isZh ? '经联邦部委批准设立之非洲中国会长论坛最高官方印鉴与徽章' : 'Official accredited bilateral emblem of the Africa China Chairmen of Business Forum.'}
              tag={isZh ? '官方印鉴' : 'Official Insignia'}
              category={isZh ? '制度化标识' : 'Institutional Seal'}
              locale={locale}
              className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden bg-accbcf-light p-4 shadow-xl border-4 border-accbcf-gold/40 flex items-center justify-center hover:shadow-2xl transition-shadow"
              aspectRatioClassName="relative w-full h-full"
              imageClassName="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-4 group flex flex-col">
            <ClickableImagePreview
              src="/images/vision.jpg"
              alt={isZh ? '愿景' : 'Our Vision'}
              title={isZh ? '非洲中国会长论坛战略愿景' : 'ACCBCF Strategic Vision'}
              caption={SITE_INFO.vision[locale]}
              tag={isZh ? '战略愿景' : 'Vision'}
              locale={locale}
              className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-xs"
              aspectRatioClassName="relative w-full h-52 sm:h-64"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-accbcf-blue-deep/80 via-accbcf-blue-deep/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-md border border-white/20 shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-accbcf-gold" />
                  <span>{isZh ? '战略愿景' : 'Our Vision'}</span>
                </span>
                <span className="text-[11px] font-semibold text-white/90 backdrop-blur-md bg-black/40 px-2.5 py-0.5 rounded-full">
                  {isZh ? '全球经贸远景' : 'Global Perspective'}
                </span>
              </div>
            </ClickableImagePreview>
            <h3 className="font-serif text-2xl font-bold text-accbcf-charcoal">
              {isZh ? '愿景' : 'Our Vision'}
            </h3>
            <p className="text-accbcf-gray text-sm leading-relaxed">
              {SITE_INFO.vision[locale]}
            </p>
          </div>

          {/* Mission */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-4 group flex flex-col">
            <ClickableImagePreview
              src="/images/mission.jpg"
              alt={isZh ? '使命' : 'Our Mission'}
              title={isZh ? '非洲中国会长论坛制度化使命' : 'ACCBCF Institutional Mission'}
              caption={SITE_INFO.mission[locale]}
              tag={isZh ? '制度使命' : 'Mission'}
              locale={locale}
              className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-xs"
              aspectRatioClassName="relative w-full h-52 sm:h-64"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-accbcf-blue-deep/80 via-accbcf-blue-deep/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal backdrop-blur-md border border-white/20 shadow-sm font-semibold">
                  <Compass className="w-3.5 h-3.5 text-accbcf-blue-deep" />
                  <span>{isZh ? '制度化使命' : 'Our Mission'}</span>
                </span>
                <span className="text-[11px] font-semibold text-white/90 backdrop-blur-md bg-black/40 px-2.5 py-0.5 rounded-full">
                  {isZh ? '中非双边协作' : 'Bilateral Action'}
                </span>
              </div>
            </ClickableImagePreview>
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

        {/* Official Bilateral Engagements & Photographic Archives */}
        <OfficialPhotoArchives locale={locale} />

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
