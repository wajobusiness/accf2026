'use client';

import React from 'react';
import { ShieldCheck, Landmark, Building2, Layers } from 'lucide-react';
import { SITE_INFO } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface CredibilityStripProps {
  locale: Locale;
}

export const CredibilityStrip: React.FC<CredibilityStripProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].credibility;

  return (
    <section className="bg-accbcf-blue-deep text-white border-y border-accbcf-gold/30 py-6 px-4 sm:px-6 lg:px-8 shadow-inner">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Item 1: Founding Milestone */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 pt-4 md:pt-0 md:pr-6">
            <div className="w-10 h-10 rounded-full bg-accbcf-gold/15 border border-accbcf-gold/50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-accbcf-gold" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accbcf-gold">
                {locale === 'zh' ? '正式成立' : 'Establishment'}
              </p>
              <p className="text-sm font-semibold text-white/95">
                {t.est}
              </p>
            </div>
          </div>

          {/* Item 2: Sovereign Headquarters */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 pt-4 md:pt-0 md:px-6">
            <div className="w-10 h-10 rounded-full bg-accbcf-blue/40 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Landmark className="w-5 h-5 text-accbcf-gold" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accbcf-gold">
                {locale === 'zh' ? '主权总部' : 'Strategic Hub'}
              </p>
              <p className="text-sm font-semibold text-white/95 truncate">
                {SITE_INFO.hqCity[locale]} · Federal Secretariat
              </p>
            </div>
          </div>

          {/* Item 3: Four Strategic Models */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 pt-4 md:pt-0 md:pl-6">
            <div className="w-10 h-10 rounded-full bg-accbcf-orange/20 border border-accbcf-orange/40 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-accbcf-orange" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accbcf-gold">
                {locale === 'zh' ? '合作矩阵' : 'Cooperation Architecture'}
              </p>
              <p className="text-sm font-semibold text-white/95">
                G2G · G2B · B2B · B2C
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
