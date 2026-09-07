import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Locale } from '@/lib/content';
import { SITE_INFO } from '@/lib/content';
import '../../globals.css';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const isZh = locale === 'zh';

  const title = isZh
    ? '非中企业领袖论坛 (ACCBCF) · 链接政府 · 赋能企业 · 共创繁荣'
    : 'Africa China Chairmen of Business Forum (ACCBCF) · Abuja Headquarters';

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
      },
    },
    openGraph: {
      title,
      description: SITE_INFO.about[locale],
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
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
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen selection:bg-accbcf-gold selection:text-accbcf-charcoal">
        <Header locale={locale} />
        <main className="flex-grow">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
