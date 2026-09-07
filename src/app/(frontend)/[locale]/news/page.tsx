import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Shield } from 'lucide-react';
import { SAMPLE_NEWS } from '@/lib/content';
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
    title: locale === 'zh' ? '新闻与洞察' : 'News & Insights',
    description: 'Official announcements, bilateral summit reports, and China-Africa industrial intelligence from ACCBCF.',
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const isZh = locale === 'zh';
  const t = UI_STRINGS[locale].news;

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_NEWS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title[locale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue text-white shadow-sm">
                      {post.category[locale]}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-accbcf-gray">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accbcf-gold" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-accbcf-gold" />
                      {post.readTime[locale]}
                    </span>
                  </div>

                  <h2 className="font-serif text-lg font-bold text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors line-clamp-2 leading-snug">
                    <Link href={`/${locale}/news/${post.slug}`}>
                      {post.title[locale]}
                    </Link>
                  </h2>

                  <p className="text-accbcf-gray text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt[locale]}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/${locale}/news/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accbcf-blue group-hover:text-accbcf-orange transition-colors"
                >
                  <span>{t.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
