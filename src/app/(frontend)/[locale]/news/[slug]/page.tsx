import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Shield, User } from 'lucide-react';
import { SAMPLE_NEWS } from '@/lib/content';
import type { Locale } from '@/lib/content';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const post of SAMPLE_NEWS) {
    params.push({ locale: 'en', slug: post.slug });
    params.push({ locale: 'zh', slug: post.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const post = SAMPLE_NEWS.find((p) => p.slug === slug);
  if (!post) return { title: 'Dispatch Not Found' };

  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    openGraph: {
      title: post.title[locale],
      description: post.excerpt[locale],
      images: [{ url: post.image }],
    },
  };
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const isZh = locale === 'zh';
  const post = SAMPLE_NEWS.find((p) => p.slug === slug);

  if (!post) notFound();

  const paragraphs = post.content[locale].split('\n\n');

  return (
    <article className="pt-24 pb-20">
      <section className="bg-accbcf-blue-deep text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accbcf-gold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isZh ? '返回全部要闻' : 'Back to All Dispatches'}</span>
          </Link>

          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-accbcf-blue text-white border border-white/20">
              {post.category[locale]}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title[locale]}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/80 border-t border-white/15 pt-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-accbcf-gold" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accbcf-gold" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accbcf-gold" />
              <span>{post.readTime[locale]}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-100">
          <Image
            src={post.image}
            alt={post.title[locale]}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-accbcf-charcoal text-base sm:text-lg leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        <div className="mt-12 p-6 rounded-2xl bg-accbcf-light border border-accbcf-gold/40 flex items-start gap-4">
          <Shield className="w-6 h-6 text-accbcf-gold flex-shrink-0 mt-1" />
          <div className="text-xs text-accbcf-gray space-y-1">
            <p className="font-bold text-accbcf-charcoal">
              {isZh ? '官方涉外经贸通讯认证' : 'Official Secretariat Diplomatic Dispatch'}
            </p>
            <p>
              {isZh
                ? '本动态由非中企业领袖论坛阿布贾常设秘书处经贸投资部与国际传媒中心联合发布，拥有唯一官方解释权。'
                : 'Transmitted by the ACCBCF Secretariat Trade & Investment Department and International Media Center at the Federal Ministry of Industry, Trade and Investment, Abuja, Nigeria.'}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
