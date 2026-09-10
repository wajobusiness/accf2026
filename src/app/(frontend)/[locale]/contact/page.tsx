import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import type { Locale } from '@/lib/content';
import { normalizeLocale } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const titles: Record<Locale, string> = {
    en: 'Contact Us',
    zh: '联系我们',
    fr: 'Contactez-nous',
    ar: 'اتصل بنا',
    pt: 'Fale Conosco',
  };
  return {
    title: titles[locale] || titles.en,
    description: 'Contact the ACCBCF Secretariat headquartered in Abuja, Nigeria. Official diplomatic and business cooperation inquiries.',
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const isZh = locale === 'zh';

  return (
    <div className="pt-24 pb-20">
      <section className="bg-accbcf-blue-deep text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40">
            <Shield className="w-3.5 h-3.5" />
            <span>{isZh ? '官方联络' : 'Official Engagement'}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold">
            <span className="inline-block bg-accbcf-gold text-accbcf-charcoal px-5 py-1.5 sm:px-7 sm:py-2 font-serif font-bold shadow-md">
              {isZh ? '联系非洲中国会长论坛' : 'Contact ACCBCF Secretariat'}
            </span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isZh
              ? '尼日利亚阿布贾联邦工业、贸易和投资部驻地 · 开启中非经贸高层战略协作'
              : 'Federal Ministry of Industry, Trade and Investment, Abuja, Nigeria · Connecting Governments, Business, and Capital.'}
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-20 text-center text-accbcf-gray">Loading inquiry module...</div>}>
        <ContactForm locale={locale} />
      </Suspense>
    </div>
  );
}
