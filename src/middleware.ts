import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'zh', 'fr', 'ar', 'pt'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // Chinese
  CN: 'zh',
  HK: 'zh',
  MO: 'zh',
  TW: 'zh',

  // French (Francophone Africa & Europe)
  FR: 'fr',
  SN: 'fr', // Senegal
  CI: 'fr', // Côte d'Ivoire
  CD: 'fr', // DR Congo
  CM: 'fr', // Cameroon
  GA: 'fr', // Gabon
  GN: 'fr', // Guinea
  ML: 'fr', // Mali
  BF: 'fr', // Burkina Faso
  NE: 'fr', // Niger
  TD: 'fr', // Chad
  CG: 'fr', // Republic of the Congo
  BJ: 'fr', // Benin
  TG: 'fr', // Togo
  RW: 'fr', // Rwanda
  BI: 'fr', // Burundi
  MG: 'fr', // Madagascar
  DJ: 'fr', // Djibouti
  KM: 'fr', // Comoros
  SC: 'fr', // Seychelles
  BE: 'fr', // Belgium
  CH: 'fr', // Switzerland
  MC: 'fr', // Monaco
  LU: 'fr', // Luxembourg

  // Arabic (North Africa & Middle East)
  EG: 'ar', // Egypt
  DZ: 'ar', // Algeria
  MA: 'ar', // Morocco
  TN: 'ar', // Tunisia
  LY: 'ar', // Libya
  SD: 'ar', // Sudan
  SA: 'ar', // Saudi Arabia
  AE: 'ar', // UAE
  QA: 'ar', // Qatar
  KW: 'ar', // Kuwait
  OM: 'ar', // Oman
  BH: 'ar', // Bahrain
  JO: 'ar', // Jordan
  LB: 'ar', // Lebanon
  IQ: 'ar', // Iraq
  YE: 'ar', // Yemen
  SY: 'ar', // Syria
  PS: 'ar', // Palestine
  MR: 'ar', // Mauritania
  SO: 'ar', // Somalia

  // Portuguese (Lusophone Africa & Europe / South America)
  AO: 'pt', // Angola
  MZ: 'pt', // Mozambique
  CV: 'pt', // Cape Verde
  GW: 'pt', // Guinea-Bissau
  ST: 'pt', // São Tomé and Príncipe
  PT: 'pt', // Portugal
  BR: 'pt', // Brazil

  // English (Anglophone Africa & International)
  NG: 'en', // Nigeria (Forum HQ)
  GH: 'en', // Ghana
  KE: 'en', // Kenya
  ZA: 'en', // South Africa
  UG: 'en', // Uganda
  TZ: 'en', // Tanzania
  ZM: 'en', // Zambia
  ZW: 'en', // Zimbabwe
  ET: 'en', // Ethiopia
  SL: 'en', // Sierra Leone
  LR: 'en', // Liberia
  GM: 'en', // Gambia
  US: 'en', // United States
  GB: 'en', // United Kingdom
  CA: 'en', // Canada
  AU: 'en', // Australia
};

function detectLocale(req: NextRequest): Locale {
  // 1. Manual user preference cookie
  const cookieLocale = req.cookies.get('accbcf_locale')?.value as Locale | undefined;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. IP / Geo-country detection from standard headers
  const countryHeader =
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-country-code') ||
    req.headers.get('geo-country');

  if (countryHeader) {
    const country = countryHeader.trim().toUpperCase();
    if (COUNTRY_TO_LOCALE[country]) {
      return COUNTRY_TO_LOCALE[country];
    }
  }

  // 3. Browser Accept-Language header fallback
  const acceptLang = req.headers.get('accept-language');
  if (acceptLang) {
    const langs = acceptLang
      .split(',')
      .map((part) => {
        const [code, qVal] = part.trim().split(';q=');
        return {
          code: code.trim().toLowerCase(),
          q: qVal ? parseFloat(qVal) : 1.0,
        };
      })
      .sort((a, b) => b.q - a.q);

    for (const { code } of langs) {
      if (code.startsWith('zh')) return 'zh';
      if (code.startsWith('fr')) return 'fr';
      if (code.startsWith('ar')) return 'ar';
      if (code.startsWith('pt')) return 'pt';
      if (code.startsWith('en')) return 'en';
    }
  }

  // 4. Default fallback: English
  return 'en';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root path request -> detect locale and redirect
  if (pathname === '/') {
    const targetLocale = detectLocale(request);
    const redirectUrl = new URL(`/${targetLocale}`, request.url);
    const response = NextResponse.redirect(redirectUrl);
    // Persist auto-detected locale cookie
    response.cookies.set('accbcf_locale', targetLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    return response;
  }

  // If already prefixed with a locale, make sure the preference cookie is maintained
  const segments = pathname.split('/');
  const firstSegment = segments[1] as Locale;
  if (SUPPORTED_LOCALES.includes(firstSegment)) {
    const response = NextResponse.next();
    const currentCookie = request.cookies.get('accbcf_locale')?.value;
    if (currentCookie !== firstSegment) {
      response.cookies.set('accbcf_locale', firstSegment, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - admin (Payload CMS admin)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images & assets)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!api|admin|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

