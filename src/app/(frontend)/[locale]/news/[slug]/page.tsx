import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Shield,
  User,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { normalizeLocale } from '@/lib/content';
import type { Locale } from '@/lib/content';
import { getNewsArticleBySlug, getAllNewsSlugs } from '@/lib/newsService';

const BACK_LABELS: Record<Locale, string> = {
  en: 'Back to All Dispatches',
  zh: '返回全部要闻',
  fr: 'Retour à toutes les dépêches',
  ar: 'العودة إلى جميع البيانات',
  pt: 'Voltar a todas as notícias',
};

const CERT_TITLES: Record<Locale, string> = {
  en: 'Official Secretariat Diplomatic Dispatch',
  zh: '官方涉外经贸通讯认证',
  fr: 'Dépêche diplomatique officielle du secrétariat',
  ar: 'بيان دبلوماسي رسمي من الأمانة العامة',
  pt: 'Despacho diplomático oficial da secretaria',
};

const CERT_DESCS: Record<Locale, string> = {
  en: 'Transmitted by the ACCBCF Secretariat Trade & Investment Department and International Media Center at the Federal Ministry of Industry, Trade and Investment, Abuja, Nigeria.',
  zh: '本动态由非洲中国会长论坛阿布贾常设秘书处经贸投资部与国际传媒中心联合发布，拥有唯一官方解释权。',
  fr: 'Transmis par le Département du Commerce et des Investissements du Secrétariat de l’ACCBCF et le Centre International des Médias au Ministère Fédéral de l’Industrie, du Commerce et des Investissements, Abuja, Nigeria.',
  ar: 'صادر عن قسم التجارة والاستثمار بالأمانة العامة لمنتدى ACCBCF والمركز الإعلامي الدولي في وزارة الصناعة والتجارة والاستثمار الفيدرالية، أبوجا، نيجيريا.',
  pt: 'Transmitido pelo Departamento de Comércio e Investimentos da Secretaria da ACCBCF e Centro Internacional de Mídia no Ministério Federal de Indústria, Comércio e Investimentos, Abuja, Nigéria.',
};

const EDITOR_LABELS: Record<
  Locale,
  {
    filedBy: string;
    totalDispatches: string;
    deskBadge: string;
    verifiedEditor: string;
    editorRole: string;
  }
> = {
  en: {
    filedBy: 'Filed by Accredited Correspondent',
    totalDispatches: 'Dispatches Published',
    deskBadge: 'ACCBCF Press Corps',
    verifiedEditor: 'Verified Diplomatic Desk Editor',
    editorRole: 'Contributing Editor',
  },
  zh: {
    filedBy: '责任编辑及特派撰稿人',
    totalDispatches: '篇已发布通讯',
    deskBadge: '论坛新闻公报署',
    verifiedEditor: '认证涉外特约编辑',
    editorRole: '特约责任编辑',
  },
  fr: {
    filedBy: 'Rédigé par le correspondant accrédité',
    totalDispatches: 'Dépêches publiées',
    deskBadge: 'Corps de Presse ACCBCF',
    verifiedEditor: 'Éditeur de bureau diplomatique vérifié',
    editorRole: 'Rédacteur accrédité',
  },
  ar: {
    filedBy: 'حرر بواسطة المراسل المعتمد',
    totalDispatches: 'بيانات منشورة',
    deskBadge: 'هيئة الصحافة ACCBCF',
    verifiedEditor: 'محرر مكتب دبلوماسي معتمد',
    editorRole: 'محرر معتمد',
  },
  pt: {
    filedBy: 'Escrito por correspondente credenciado',
    totalDispatches: 'Despachos publicados',
    deskBadge: 'Corpo de Imprensa ACCBCF',
    verifiedEditor: 'Editor de mesa diplomática verificado',
    editorRole: 'Editor credenciado',
  },
};

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh', 'fr', 'ar', 'pt'];
  const slugs = await getAllNewsSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const slug of slugs) {
    for (const locale of locales) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const post = await getNewsArticleBySlug(slug, locale);

  if (!post) return { title: 'Dispatch Not Found' };

  const metaTitle = post.seo?.metaTitle || `${post.title} | ACCBCF`;
  const metaDescription = post.seo?.metaDescription || post.excerpt;
  const ogImageUrl = post.seo?.ogImage || post.image;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.seo?.metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    alternates: post.seo?.canonicalUrl ? { canonical: post.seo.canonicalUrl } : undefined,
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const post = await getNewsArticleBySlug(slug, locale);

  if (!post) notFound();

  const isZh = locale === 'zh';
  const edStrings = EDITOR_LABELS[locale] || EDITOR_LABELS.en;
  const paragraphs = (post.content || '').split('\n\n').filter(Boolean);

  return (
    <article className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-accbcf-blue-deep text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accbcf-gold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{BACK_LABELS[locale]}</span>
          </Link>

          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-accbcf-blue text-white border border-white/20">
              {post.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/85 border-t border-white/15 pt-4">
            <div className="flex flex-wrap items-center gap-5">
              {/* Author with post count snippet */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 border border-accbcf-gold/60 flex items-center justify-center flex-shrink-0">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-3 h-3 text-accbcf-gold" />
                  )}
                </div>
                <span className="font-medium text-white">{post.author.name}</span>
                <span className="text-white/40">•</span>
                <span className="text-accbcf-gold font-medium">
                  {post.author.totalPosts} {isZh ? '篇已发要闻' : 'Dispatches'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accbcf-gold" />
                <span>{post.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accbcf-gold" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/30">
                {edStrings.deskBadge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        {post.imageCaption && (
          <p className="mt-2.5 text-xs text-center text-accbcf-gray italic">
            {post.imageCaption}
          </p>
        )}
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-accbcf-charcoal text-base sm:text-lg leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        {/* Prominent Editor Profile Card */}
        <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-accbcf-blue/10 border-2 border-accbcf-gold flex items-center justify-center flex-shrink-0 shadow-sm">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-accbcf-blue" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accbcf-blue">
                    {edStrings.filedBy}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-accbcf-charcoal">
                  {post.author.name}
                </h4>
                <p className="text-xs sm:text-sm text-accbcf-gray">
                  {post.author.designation || edStrings.editorRole}
                </p>
              </div>
            </div>

            {/* Total Articles Published by Editor Counter */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-accbcf-blue text-white shadow-sm">
                <FileText className="w-4 h-4 text-accbcf-gold" />
                <span className="text-sm font-bold">
                  {post.author.totalPosts}{' '}
                  <span className="text-xs font-normal text-white/90">
                    {isZh ? '篇已发布' : 'Articles'}
                  </span>
                </span>
              </div>
              <span className="text-[11px] text-accbcf-gray mt-1 hidden sm:block">
                {edStrings.totalDispatches}
              </span>
            </div>
          </div>
        </div>

        {/* Diplomatic Certification Box */}
        <div className="mt-8 p-6 rounded-2xl bg-accbcf-light border border-accbcf-gold/40 flex items-start gap-4">
          <Shield className="w-6 h-6 text-accbcf-gold flex-shrink-0 mt-1" />
          <div className="text-xs text-accbcf-gray space-y-1">
            <p className="font-bold text-accbcf-charcoal">
              {CERT_TITLES[locale]}
            </p>
            <p>{CERT_DESCS[locale]}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
