'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { SocialIconsGroup } from '@/components/common/SocialIcons';
import { SITE_INFO } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface ContactCtaBandProps {
  locale: Locale;
}

export const ContactCtaBand: React.FC<ContactCtaBandProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].contactBand;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accbcf-blue-deep via-accbcf-blue to-accbcf-blue-dark text-white relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-accbcf-gold/10 filter blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-accbcf-red/10 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/5 border border-white/15 rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text & Action */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40">
                {locale === 'zh' ? '政企高层对接' : 'Strategic Engagement'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {t.title}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
                {t.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href={`/${locale}/contact`}
                  className="sheen-sweep inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal hover:bg-accbcf-gold-light hover:shadow-lg transition-all"
                >
                  <span>{t.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={SITE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-emerald-600/90 hover:bg-emerald-500 text-white border border-emerald-400/40 transition-colors"
                >
                  <span>{t.directChat}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Official Coordinates */}
            <div className="lg:col-span-5 bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/15 space-y-4">
              <h3 className="font-serif text-lg font-bold text-accbcf-gold">
                {locale === 'zh' ? '阿布贾常设办事机构' : 'Abuja Secretariat Headquarters'}
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-white/90">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accbcf-gold flex-shrink-0 mt-1" />
                  <span className="leading-snug">
                    {SITE_INFO.hqAddress[locale]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accbcf-gold flex-shrink-0" />
                  <a
                    href={`mailto:${SITE_INFO.email}`}
                    className="hover:text-accbcf-gold transition-colors truncate"
                  >
                    {SITE_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accbcf-gold flex-shrink-0" />
                  <a
                    href={`tel:${SITE_INFO.phone}`}
                    className="hover:text-accbcf-gold transition-colors"
                  >
                    {SITE_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Official Social Channels */}
              <div className="pt-3 border-t border-white/15 space-y-2">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-accbcf-gold">
                  {locale === 'zh' ? '官方社交媒体' : 'Official Social Channels'}
                </span>
                <SocialIconsGroup variant="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
