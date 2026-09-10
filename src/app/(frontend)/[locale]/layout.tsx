import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SocialMediaDock } from '@/components/common/SocialMediaDock';
import type { Locale } from '@/lib/content';
import { SITE_INFO } from '@/lib/content';
import '../../globals.css';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'fr' },
    { locale: 'ar' },
    { locale: 'pt' },
  ];
}

const TITLES: Record<Locale, string> = {
  en: 'Africa China Chairmen of Business Forum (ACCBCF) · Abuja Headquarters',
  zh: '非中企业领袖论坛 (ACCBCF) · 链接政府 · 赋能企业 · 共创繁荣',
  fr: 'Forum des Présidents d’Entreprises Afrique–Chine (ACCBCF) · Siège d’Abuja',
  ar: 'منتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية (ACCBCF) · المقر الرئيسي في أبوجا',
  pt: 'Fórum de Presidentes de Negócios África–China (ACCBCF) · Sede de Abuja',
};

const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  fr: 'fr_FR',
  ar: 'ar_SA',
  pt: 'pt_PT',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const validLocales: Locale[] = ['en', 'zh', 'fr', 'ar', 'pt'];
  const locale: Locale = validLocales.includes(rawLocale as Locale) ? (rawLocale as Locale) : 'en';

  const title = TITLES[locale] || TITLES.en;

  return {
    title: {
      default: title,
      template: '%s | ACCBCF',
    },
    description: SITE_INFO.about[locale],
    keywords: [
      'ACCBCF',
      'Africa China Chairmen of Business Forum',
      '非中企业领袖论坛',
      'Forum des Présidents d’Entreprises Afrique-Chine',
      'Abuja',
      'Nigeria',
      'China Africa Trade',
      'G2G',
      'G2B',
      'B2B',
      'B2C',
      'Federal Ministry of Industry Trade and Investment',
    ],
    authors: [{ name: 'ACCBCF Secretariat' }],
    metadataBase: new URL('https://africachinachairmenforum.org'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        zh: '/zh',
        fr: '/fr',
        ar: '/ar',
        pt: '/pt',
      },
    },
    openGraph: {
      title,
      description: SITE_INFO.about[locale],
      type: 'website',
      locale: OG_LOCALES[locale] || 'en_US',
      images: [
        {
          url: '/images/accbcf-emblem.jpg',
          width: 800,
          height: 800,
          alt: 'ACCBCF Official Seal',
        },
      ],
    },
    icons: {
      icon: '/images/accbcf-emblem.jpg',
      apple: '/images/accbcf-emblem.jpg',
    },
  };
}

export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const validLocales: Locale[] = ['en', 'zh', 'fr', 'ar', 'pt'];
  const locale: Locale = validLocales.includes(rawLocale as Locale) ? (rawLocale as Locale) : 'en';
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className="flex flex-col min-h-screen selection:bg-accbcf-gold selection:text-accbcf-charcoal">
        <Header locale={locale} />
        <main className="flex-grow">{children}</main>
        <Footer locale={locale} />
        <SocialMediaDock locale={locale} />
      </body>
    </html>
  );
}
