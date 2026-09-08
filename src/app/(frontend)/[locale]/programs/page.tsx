import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Landmark,
  Briefcase,
  CreditCard,
  Scale,
  Globe2,
  Users,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { CORE_SERVICES } from '@/lib/content';
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
    title: locale === 'zh' ? '核心服务与项目' : 'Programs & Core Services',
    description: 'ACCBCF institutional services covering Government Cooperation, Investment Promotion, Financial Services, Legal Compliance, and Business Matching.',
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const t = UI_STRINGS[locale].programsPage;

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7 text-accbcf-blue' };
    switch (iconName) {
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'CreditCard':
        return <CreditCard {...props} />;
      case 'Scale':
        return <Scale {...props} />;
      case 'Globe2':
        return <Globe2 {...props} />;
      case 'Users':
        return <Users {...props} />;
      default:
        return <Briefcase {...props} />;
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-accbcf-gold/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-accbcf-light group-hover:bg-accbcf-blue/10 flex items-center justify-center transition-colors">
                  {renderIcon(srv.icon)}
                </div>
                <h3 className="font-serif text-xl font-bold text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors">
                  {srv.name[locale]}
                </h3>
                <p className="text-accbcf-gray text-xs sm:text-sm font-medium leading-relaxed">
                  {srv.shortDescription[locale]}
                </p>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-accbcf-gray/90 text-xs leading-relaxed">
                    {srv.longDescription[locale]}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <Link
                  href={`/${locale}/contact?service=${srv.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-accbcf-light group-hover:bg-accbcf-blue text-accbcf-blue group-hover:text-white transition-colors"
                >
                  <span>{t.requestCta}</span>
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
