import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SocialMediaDock } from '@/components/common/SocialMediaDock';
import { WhatsAppLiveChat } from '@/components/common/WhatsAppLiveChat';
import { WelcomeVideoModal } from '@/components/common/WelcomeVideoModal';
import { JsonLd } from '@/components/common/JsonLd';
import type { Locale } from '@/lib/content';
import { normalizeLocale } from '@/lib/content';
import { getSiteSeoSettings, generateOrganizationJsonLd } from '@/lib/seoService';
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
  const locale: Locale = normalizeLocale(rawLocale);
  const seo = await getSiteSeoSettings(locale);

  const defaultTitle = seo.siteName;
  const titleTemplate = seo.titleTemplate || '%s | Africa China Chairmen of Business Forum';
  const metaDescription = seo.defaultMetaDescription;
  const keywordsList = seo.defaultKeywords
    ? seo.defaultKeywords.split(',').map((k) => k.trim())
    : [];

  const verification: Record<string, string> = {};
  if (seo.googleVerification) {
    verification.google = seo.googleVerification;
  }
  if (seo.bingVerification) {
    verification.bing = seo.bingVerification;
  }
  if (seo.yandexVerification) {
    verification.yandex = seo.yandexVerification;
  }
  if (seo.baiduVerification) {
    (verification as any)['baidu'] = seo.baiduVerification;
  }

  const isNoIndex = seo.indexingDirective?.includes('noindex');

  return {
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description: metaDescription,
    keywords: keywordsList,
    authors: [{ name: 'ACCBCF Secretariat' }, { name: 'Africa China Chairmen of Business Forum' }],
    metadataBase: new URL(seo.canonicalBaseUrl || 'https://www.africachinachairmenforum.com'),
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
      title: defaultTitle,
      description: metaDescription,
      type: 'website',
      siteName: seo.siteName,
      url: `${seo.canonicalBaseUrl}/${locale}`,
      locale: OG_LOCALES[locale] || 'en_US',
      images: [
        {
          url: seo.ogImageUrl || '/images/accbcf-emblem.jpg',
          width: 1200,
          height: 630,
          alt: `${seo.siteName} Emblem`,
        },
      ],
    },
    twitter: {
      card: seo.twitterCardType || 'summary_large_image',
      title: defaultTitle,
      description: metaDescription,
      site: seo.twitterHandle || '@accbcf_official',
      creator: seo.twitterHandle || '@accbcf_official',
      images: [seo.ogImageUrl || '/images/accbcf-emblem.jpg'],
    },
    icons: {
      icon: [
        { url: '/images/accbcf-emblem.jpg', sizes: '32x32', type: 'image/jpeg' },
        { url: '/images/accbcf-logo.svg', type: 'image/svg+xml' },
      ],
      apple: '/images/accbcf-emblem.jpg',
      shortcut: '/images/accbcf-emblem.jpg',
    },
    verification: Object.keys(verification).length > 0 ? verification : undefined,
    robots: {
      index: !isNoIndex,
      follow: !isNoIndex,
      googleBot: {
        index: !isNoIndex,
        follow: !isNoIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
  const locale: Locale = normalizeLocale(rawLocale);
  const isRtl = locale === 'ar';
  const seo = await getSiteSeoSettings(locale);
  const jsonLdData = generateOrganizationJsonLd(seo, locale);

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <head>
        <JsonLd data={jsonLdData} />
        {seo.baiduVerification && (
          <meta name="baidu-site-verification" content={seo.baiduVerification} />
        )}
        {seo.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${seo.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${seo.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="flex flex-col min-h-screen selection:bg-accbcf-gold selection:text-accbcf-charcoal">
        <Header locale={locale} />
        <main className="flex-grow">{children}</main>
        <Footer locale={locale} />
        <SocialMediaDock locale={locale} />
        <WhatsAppLiveChat locale={locale} />
        <WelcomeVideoModal locale={locale} />
      </body>
    </html>
  );
}

