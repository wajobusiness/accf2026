'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink, Shield, Globe2, Lock } from 'lucide-react';
import { UI_STRINGS } from '@/lib/translations';
import { SITE_INFO, PRIORITY_SECTORS, CORE_SERVICES } from '@/lib/content';
import type { Locale } from '@/lib/content';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].footer;

  return (
    <footer className="bg-accbcf-blue-deep text-white border-t-2 border-accbcf-gold/30">
      {/* Top Diplomatic Seal & Mission Strip */}
      <div className="bg-gradient-to-r from-accbcf-blue-deep via-accbcf-blue-dark to-accbcf-blue-deep py-6 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accbcf-gold/10 border border-accbcf-gold/40 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-accbcf-gold" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accbcf-gold">
                {locale === 'zh' ? '官方涉外政商协作枢纽' : 'Official China–Africa Bilateral Platform'}
              </p>
              <p className="text-xs text-white/80">
                {locale === 'zh'
                  ? '立足西非 · 辐射全非 · 对接中国 · 链接全球'
                  : 'Based in Abuja · Covering Africa · Connecting China · Engaging Globally'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {locale === 'zh' ? '阿布贾常设秘书处运转中' : 'Abuja Secretariat Active'}
            </span>
            <span className="text-white/30">|</span>
            <span>{locale === 'zh' ? '2026年3月30日奠基' : 'Founded 30 March 2026'}</span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Identity & Crest */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow ring-2 ring-accbcf-gold">
                <Image
                  src="/images/accbcf-emblem.jpg"
                  alt="ACCBCF Official Seal"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white tracking-wide">
                  ACCBCF
                </h3>
                <p className="text-xs text-accbcf-gold font-medium">
                  {SITE_INFO.name[locale]}
                </p>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              {SITE_INFO.slogan[locale]}
            </p>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              {t.desc}
            </p>

            <div className="pt-2">
              <a
                href={SITE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/40 transition-colors"
              >
                <span>WhatsApp: {SITE_INFO.phone}</span>
                <ExternalLink className="w-3 h-3 text-emerald-300" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accbcf-gold border-b border-white/10 pb-2">
              {t.linksTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${locale}`} className="text-white/70 hover:text-accbcf-gold transition-colors">
                  {UI_STRINGS[locale].nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-white/70 hover:text-accbcf-gold transition-colors">
                  {UI_STRINGS[locale].nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/governance`} className="text-white/70 hover:text-accbcf-gold transition-colors">
                  {UI_STRINGS[locale].nav.governance}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/programs`} className="text-white/70 hover:text-accbcf-gold transition-colors">
                  {UI_STRINGS[locale].nav.programs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sectors`} className="text-white/70 hover:text-accbcf-gold transition-colors">
                  {UI_STRINGS[locale].nav.sectors}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/news`} className="text-white/70 hover:text-accbcf-gold transition-colors">
                  {UI_STRINGS[locale].nav.news}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/events`} className="text-white/70 hover:text-accbcf-gold transition-colors">
                  {UI_STRINGS[locale].nav.events}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-white/70 hover:text-accbcf-gold transition-colors">
                  {UI_STRINGS[locale].nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Sectors & Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accbcf-gold border-b border-white/10 pb-2">
              {t.sectorsTitle}
            </h4>
            <ul className="space-y-1.5 text-xs text-white/70">
              {PRIORITY_SECTORS.slice(0, 6).map((sec) => (
                <li key={sec.id}>
                  <Link
                    href={`/${locale}/sectors#${sec.slug}`}
                    className="hover:text-accbcf-gold transition-colors line-clamp-1"
                  >
                    {sec.name[locale]}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href={`/${locale}/sectors`}
                  className="text-accbcf-gold hover:underline text-[11px] font-semibold"
                >
                  +{PRIORITY_SECTORS.length - 6} {locale === 'zh' ? '更多产业' : 'more sectors'} &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Secretariat HQ Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accbcf-gold border-b border-white/10 pb-2">
              {t.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accbcf-gold flex-shrink-0 mt-0.5" />
                <span className="leading-snug text-white/70">
                  {SITE_INFO.hqAddress[locale]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accbcf-gold flex-shrink-0" />
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="hover:text-accbcf-gold transition-colors truncate"
                >
                  {SITE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accbcf-gold flex-shrink-0" />
                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="hover:text-accbcf-gold transition-colors"
                >
                  {SITE_INFO.phone}
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white transition-colors"
                >
                  <Lock className="w-3 h-3 text-accbcf-gold/70" />
                  <span>{UI_STRINGS[locale].nav.adminPortal} (Payload CMS)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} ACCBF. {t.rights}
          </div>
          <div className="flex items-center gap-1.5 text-white/60">
            <span>Powered by</span>
            <a
              href="https://finxhost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accbcf-gold hover:text-accbcf-gold-light hover:underline font-medium transition-colors"
            >
              FinxHost Limited
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
