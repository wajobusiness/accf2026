'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SITE_INFO } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface AboutSnapshotProps {
  locale: Locale;
}

export const AboutSnapshot: React.FC<AboutSnapshotProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].aboutSnapshot;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accbcf-light">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accbcf-blue/10 border border-accbcf-blue/20 text-xs font-bold uppercase tracking-wider text-accbcf-blue">
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-accbcf-charcoal font-bold leading-snug">
            {t.title}
          </h2>
          <p className="text-accbcf-gray text-base sm:text-lg leading-relaxed">
            {t.lead}
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accbcf-blue/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="w-12 h-12 rounded-xl bg-accbcf-blue/10 text-accbcf-blue flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-accbcf-blue" />
            </div>
            <h3 className="font-serif text-xl font-bold text-accbcf-charcoal mb-3">
              {t.visionTitle}
            </h3>
            <p className="text-accbcf-gray text-sm leading-relaxed">
              {SITE_INFO.vision[locale]}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accbcf-gold/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="w-12 h-12 rounded-xl bg-accbcf-gold/20 text-accbcf-gold-dark flex items-center justify-center mb-6">
              <Compass className="w-6 h-6 text-accbcf-gold-dark" />
            </div>
            <h3 className="font-serif text-xl font-bold text-accbcf-charcoal mb-3">
              {t.missionTitle}
            </h3>
            <p className="text-accbcf-gray text-sm leading-relaxed">
              {SITE_INFO.mission[locale]}
            </p>
          </motion.div>
        </div>

        {/* Guiding Principles Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-accbcf-blue">
                {locale === 'zh' ? '五项行动准则' : 'Five Guiding Principles'}
              </span>
              <p className="text-sm font-semibold text-accbcf-charcoal">
                {locale === 'zh'
                  ? '政府引导 · 商会协同 · 企业主体 · 市场运作 · 合作共赢'
                  : 'Institutional principles underpinning every ACCBCF bilateral initiative.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {SITE_INFO.guidingPrinciples.map((principle, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accbcf-light text-accbcf-blue border border-accbcf-blue/20"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-accbcf-gold" />
                  <span>{principle[locale]}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accbcf-blue">
                {locale === 'zh' ? '基石信念' : 'Guiding Compass'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-accbcf-charcoal">
                {t.valuesTitle}
              </h3>
            </div>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accbcf-blue hover:text-accbcf-gold transition-colors"
            >
              <span>{t.learnMore}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SITE_INFO.coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:border-accbcf-gold/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-accbcf-gold/15 flex items-center justify-center text-accbcf-gold-dark font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="font-serif font-bold text-base text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors">
                    {val.name[locale]}
                  </h4>
                </div>
                <p className="text-accbcf-gray text-xs leading-relaxed">
                  {val.description[locale]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
