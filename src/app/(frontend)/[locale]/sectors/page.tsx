import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sprout,
  Gem,
  Zap,
  Cpu,
  TrainTrack,
  HeartPulse,
  Landmark,
  Radio,
  Truck,
  Building,
  Leaf,
  Compass,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { PRIORITY_SECTORS } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  return {
    title: locale === 'zh' ? '十二大重点产业' : '12 Priority Sectors',
    description: 'ACCBCF Priority Sectors for China-Africa economic cooperation and industrial development.',
  };
}

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const isZh = locale === 'zh';
  const t = UI_STRINGS[locale].sectorsPage;

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7 text-accbcf-gold' };
    switch (iconName) {
      case 'Sprout':
        return <Sprout {...props} />;
      case 'Gem':
        return <Gem {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'TrainTrack':
        return <TrainTrack {...props} />;
      case 'HeartPulse':
        return <HeartPulse {...props} />;
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Radio':
        return <Radio {...props} />;
      case 'Truck':
        return <Truck {...props} />;
      case 'Building':
        return <Building {...props} />;
      case 'Leaf':
        return <Leaf {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      default:
        return <Building {...props} />;
    }
  };

  return (
    <div className="pt-24 pb-20">
      <section className="bg-accbcf-blue-deep text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40">
            <Shield className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            {t.title}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRIORITY_SECTORS.map((sec, idx) => (
            <div
              key={sec.id}
              id={sec.slug}
              className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-accbcf-blue/40 transition-all flex flex-col justify-between group scroll-mt-28"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-accbcf-light group-hover:bg-accbcf-orange/10 flex items-center justify-center transition-colors">
                    {renderIcon(sec.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-accbcf-gray/60">
                    SECTOR {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors">
                  {sec.name[locale]}
                </h3>

                <p className="text-accbcf-charcoal text-xs sm:text-sm font-medium leading-relaxed">
                  {sec.description[locale]}
                </p>

                <p className="text-accbcf-gray text-xs leading-relaxed pt-2 border-t border-gray-100">
                  {sec.details[locale]}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <Link
                  href={`/${locale}/contact?sector=${sec.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-accbcf-light group-hover:bg-accbcf-blue text-accbcf-blue group-hover:text-white transition-colors"
                >
                  <span>{isZh ? '申请产业对接' : 'Inquire on Sector Matching'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
