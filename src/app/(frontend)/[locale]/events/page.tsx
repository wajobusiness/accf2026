import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Shield, ArrowRight, Clock } from 'lucide-react';
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
    title: locale === 'zh' ? '重要活动' : 'Events & Bilateral Summits',
    description: 'ACCBCF official events, bilateral summits, trade delegations, and ministerial roundtables.',
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const isZh = locale === 'zh';

  return (
    <div className="pt-24 pb-20">
      <section className="bg-accbcf-blue-deep text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40">
            <Shield className="w-3.5 h-3.5" />
            <span>{isZh ? '活动日程' : 'Forum Calendar'}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            {isZh ? '重要活动与双边峰会' : 'Events & Bilateral Summits'}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isZh
              ? '双边部长级圆桌会、中非经贸投资博览推介会与行业考察团日程'
              : 'Ministerial roundtables, bilateral trade delegations, and sectoral symposiums organized by ACCBCF.'}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal">
              {isZh ? '创会历史时刻' : 'Historic Inauguration'}
            </span>
            <div className="flex items-center gap-4 text-xs text-accbcf-gray">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accbcf-blue" />
                <span>30 March 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accbcf-blue" />
                <span>{SITE_INFO.hqCity[locale]}</span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold text-accbcf-charcoal">
              {isZh
                ? '非中企业领袖论坛（ACCBCF）全球成立大会'
                : 'Inaugural General Assembly of the Africa China Chairmen of Business Forum'}
            </h3>
            <p className="text-accbcf-gray text-sm leading-relaxed">
              {isZh
                ? '非洲多国经贸部长、中资驻非商会会长与百余位骨干企业董事长齐聚尼日利亚阿布贾联邦秘书处，共同见证论坛常设机构设立，正式发布四大战略合作模式与十二大重点产业规划。'
                : 'Ministerial dignitaries, chamber presidents, and over one hundred enterprise chairmen gathered at the Federal Ministry of Industry, Trade and Investment in Abuja to celebrate the formal charter of ACCBCF.'}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={`/${locale}/news/inauguration-of-accbcf-in-abuja`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accbcf-blue hover:text-accbcf-orange transition-colors"
            >
              <span>{isZh ? '查看成立大会实况报道' : 'Read Assembly Dispatch'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-accbcf-light border border-gray-200 text-center space-y-3">
          <Clock className="w-8 h-8 text-accbcf-blue mx-auto" />
          <h4 className="font-serif text-lg font-bold text-accbcf-charcoal">
            {isZh ? '后续双边峰会规划中' : 'Upcoming Summits in Planning'}
          </h4>
          <p className="text-accbcf-gray text-xs sm:text-sm max-w-lg mx-auto">
            {isZh
              ? '常设秘书处正紧密筹备下一届中非矿产深加工技术研讨会及农业现代化投融资推介会，具体排期将通过官方渠道通告。'
              : 'The Secretariat is structuring upcoming sectoral roadshows in energy infrastructure and industrial agro-processing. Official dates will be gazetted here.'}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-blue text-white hover:bg-accbcf-blue-dark transition-colors"
            >
              <span>{isZh ? '预先登记参会意向' : 'Register Advance Interest'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
