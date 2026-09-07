'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  Award,
  Briefcase,
  Building2,
  FolderKanban,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { GOVERNANCE_TIERS } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface OrgChartProps {
  locale: Locale;
}

export const OrgChart: React.FC<OrgChartProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].governancePage;

  const getTierIcon = (level: number) => {
    switch (level) {
      case 1:
        return <Shield className="w-5 h-5 text-accbcf-gold" />;
      case 2:
        return <Users className="w-5 h-5 text-accbcf-gold" />;
      case 3:
        return <Award className="w-5 h-5 text-accbcf-gold" />;
      case 4:
        return <Briefcase className="w-5 h-5 text-accbcf-gold" />;
      case 5:
        return <Building2 className="w-5 h-5 text-accbcf-gold" />;
      case 6:
        return <FolderKanban className="w-5 h-5 text-accbcf-gold" />;
      default:
        return <Shield className="w-5 h-5 text-accbcf-gold" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accbcf-blue/10 border border-accbcf-blue/20 text-xs font-bold uppercase tracking-wider text-accbcf-blue">
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-accbcf-charcoal font-bold">
            {t.title}
          </h2>
          <p className="text-accbcf-gray text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Coded Vertical Org Chart Flow */}
        <div className="relative space-y-8">
          {GOVERNANCE_TIERS.map((tier, idx) => (
            <div key={tier.id} className="relative">
              {/* Vertical connecting line from previous tier */}
              {idx > 0 && (
                <div className="flex justify-center -mt-6 mb-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-accbcf-gold to-accbcf-blue" />
                    <ChevronDown className="w-4 h-4 text-accbcf-blue -mt-1" />
                  </div>
                </div>
              )}

              {/* Tier Block */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  tier.level <= 2
                    ? 'bg-gradient-to-r from-accbcf-blue-deep to-accbcf-blue text-white border-accbcf-gold/50 shadow-md'
                    : tier.level === 3 || tier.level === 4
                    ? 'bg-accbcf-light text-accbcf-charcoal border-accbcf-blue/30'
                    : 'bg-white text-accbcf-charcoal border-gray-200'
                }`}
              >
                {/* Tier Title Header */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          tier.level <= 2
                            ? 'bg-white/10 text-accbcf-gold border border-white/20'
                            : 'bg-accbcf-blue/10 text-accbcf-blue'
                        }`}
                      >
                        {getTierIcon(tier.level)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                              tier.level <= 2
                                ? 'bg-accbcf-gold text-accbcf-charcoal'
                                : 'bg-accbcf-blue/10 text-accbcf-blue'
                            }`}
                          >
                            Tier 0{tier.level}
                          </span>
                          {tier.level === 1 && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-accbcf-gold">
                              {locale === 'zh' ? '最高决策机构' : 'Highest Authority'}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">
                          {tier.name[locale]}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p
                    className={`mt-4 text-xs sm:text-sm leading-relaxed max-w-3xl ${
                      tier.level <= 2 ? 'text-white/80' : 'text-accbcf-gray'
                    }`}
                  >
                    {tier.description[locale]}
                  </p>

                  {/* Sub-Items (for Secretariat & Industry Committees) */}
                  {tier.items && tier.items.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200/60 dark:border-white/15">
                      <div
                        className={`grid gap-4 ${
                          tier.level === 5
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                        }`}
                      >
                        {tier.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className={`p-4 rounded-xl border transition-all ${
                              tier.level <= 2
                                ? 'bg-white/10 border-white/20'
                                : 'bg-white border-gray-200/80 hover:border-accbcf-gold/60 shadow-xs'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-accbcf-gold flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-serif font-bold text-xs sm:text-sm text-accbcf-charcoal">
                                  {item.name[locale]}
                                </h4>
                                {item.description && (
                                  <p className="text-[11px] text-accbcf-gray mt-1 leading-snug">
                                    {item.description[locale]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
