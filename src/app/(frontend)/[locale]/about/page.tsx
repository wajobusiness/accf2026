import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Eye, Compass, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import { SITE_INFO, normalizeLocale } from '@/lib/content';
import type { Locale } from '@/lib/content';

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

        {/* Official Bilateral Engagements & Photographic Archives */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accbcf-blue">
              {isZh ? '官方纪实' : 'Official Photo Archives'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-accbcf-charcoal">
              {isZh ? '部委协同、双边会见与外交理事大会' : 'Ministerial Synergy, Bilateral Audiences & Diplomatic Envoys'}
            </h3>
            <p className="text-accbcf-gray text-xs sm:text-sm">
              {isZh
                ? '常设机构真实工作场景与高层战略对接实景记录'
                : 'Photographic documentation of official ACCBCF leadership engagements in Abuja and across the continent.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/forum/fmiti-headquarters-handshake.jpg"
                  alt="Federal Ministry of Industry, Trade and Investment Abuja HQ"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm">
                    {isZh ? '联邦部委总部' : 'Federal Ministry HQ'}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="font-serif font-bold text-sm text-accbcf-charcoal">
                  {isZh ? '联邦工贸投部高层对接' : 'Federal Ministry of Industry, Trade & Investment'}
                </h4>
                <p className="text-accbcf-gray text-xs leading-relaxed">
                  {isZh
                    ? '在尼日利亚总统博拉·提努布官方肖像下举行双边正式握手与会谈'
                    : 'Bilateral audience and protocol handshake directly inside the Federal Ministry HQ in Abuja.'}
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/forum/leadership-council-assembly.jpg"
                  alt="Executive Leadership Council Assembly"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm">
                    {isZh ? '理事会高层合影' : 'Leadership Council'}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="font-serif font-bold text-sm text-accbcf-charcoal">
                  {isZh ? '全国主席张晓鹏与高层理事会' : 'High Chief Zhang Xiaopeng & Leadership Council'}
                </h4>
                <p className="text-accbcf-gray text-xs leading-relaxed">
                  {isZh
                    ? '论坛执行委员会在官方肖像墙前举行战略决议合影'
                    : 'Executive Council assembly convened before official portraits of bilateral heads of state.'}
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/forum/diplomatic-assembly-abuja.jpg"
                  alt="Plenary Assembly of International Ambassadors and Envoys in Abuja"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm">
                    {isZh ? '外交使团大会' : 'Diplomatic Plenary'}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="font-serif font-bold text-sm text-accbcf-charcoal">
                  {isZh ? '国际外交使团与理事盛会' : 'Plenary Reception of Ambassadors & Envoys'}
                </h4>
                <p className="text-accbcf-gray text-xs leading-relaxed">
                  {isZh
                    ? '各国驻阿布贾外交使节、商务参赞与多边机构领袖全体合影'
                    : 'Continental ambassadors, commercial attachés, and enterprise leaders convened in Abuja.'}
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/forum/02.jpeg"
                  alt="His Imperial Majesty The Ooni of Ife and ACCBCF Leadership"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm">
                    {isZh ? '王室最高顾问' : 'Royal Patronage'}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="font-serif font-bold text-sm text-accbcf-charcoal">
                  {isZh ? '伊费国王陛下与论坛理事长' : 'His Imperial Majesty The Ooni of Ife'}
                </h4>
                <p className="text-accbcf-gray text-xs leading-relaxed">
                  {isZh
                    ? '非洲著名传统领袖与论坛高级顾问委员会协同'
                    : 'Traditional royal patronage underpinning social consensus and long-term security for investments.'}
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/forum/12-presidential.jpeg"
                  alt="Former President Olusegun Obasanjo and ACCBCF Leadership"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm">
                    {isZh ? '元首级对话' : 'Statesmanship'}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="font-serif font-bold text-sm text-accbcf-charcoal">
                  {isZh ? '前总统奥巴桑乔战略会晤' : 'Presidential Statesman Dialogue'}
                </h4>
                <p className="text-accbcf-gray text-xs leading-relaxed">
                  {isZh
                    ? '围绕非洲大陆工业化战略与双边产业对接开展高水平交流'
                    : 'Strategic engagement on continental industrial corridors and high-level bilateral trade channels.'}
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/forum/ambassadorial-dialogue.jpg"
                  alt="Ambassadorial Bilateral Dialogue in Abuja"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm">
                    {isZh ? '使团高层对话' : 'Ambassadorial Accord'}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="font-serif font-bold text-sm text-accbcf-charcoal">
                  {isZh ? '双边大使战略合作握手' : 'Diplomatic Envoy Bilateral Handshake'}
                </h4>
                <p className="text-accbcf-gray text-xs leading-relaxed">
                  {isZh
                    ? '深化双边外交协同、南南合作与跨国重大投资落地'
                    : 'Strengthening South-South diplomatic alignment and sovereign-backed trade partnerships.'}
                </p>
              </div>
            </div>
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
