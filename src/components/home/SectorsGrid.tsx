'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sprout,
  Gem,
  Zap,
  Cpu,
  TrainTrack,
  HeartPulse,
  Landmark,
  Radio,
  Truck,
  Building,
  Leaf,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { PRIORITY_SECTORS } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface SectorsGridProps {
  locale: Locale;
}

export const SectorsGrid: React.FC<SectorsGridProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].sectors;

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 transition-colors duration-150' };
    switch (iconName) {
      case 'Sprout':
        return <Sprout {...props} />;
      case 'Gem':
        return <Gem {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'TrainTrack':
        return <TrainTrack {...props} />;
      case 'HeartPulse':
        return <HeartPulse {...props} />;
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Radio':
        return <Radio {...props} />;
      case 'Truck':
        return <Truck {...props} />;
      case 'Building':
        return <Building {...props} />;
      case 'Leaf':
        return <Leaf {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      default:
        return <Building {...props} />;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accbcf-gold/15 border border-accbcf-gold/30 text-xs font-bold uppercase tracking-wider text-accbcf-charcoal">
              <span>{t.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-accbcf-charcoal font-bold leading-tight">
              {t.title}
            </h2>
            <p className="text-accbcf-gray text-base leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          <Link
            href={`/${locale}/sectors`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-blue text-white hover:bg-accbcf-blue-dark transition-colors"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 12-Sector Grid with staggered children & hover lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRIORITY_SECTORS.map((sector, idx) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#F8FAFC] rounded-2xl border border-gray-200/80 shadow-sm hover:bg-white hover:border-accbcf-gold hover:shadow-xl transition-all duration-200 group"
            >
              <Link
                href={`/${locale}/sectors/${sector.slug}`}
                className="p-6 flex flex-col justify-between h-full cursor-pointer"
              >
                <div>
                  {/* Icon shifts from gold to orange on hover */}
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-accbcf-orange/10 flex items-center justify-center text-accbcf-gold group-hover:text-accbcf-orange mb-4 transition-colors duration-150 shadow-sm border border-gray-100">
                    {renderIcon(sector.icon)}
                  </div>
                  <h3 className="font-serif text-base font-bold text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors duration-150 mb-2">
                    {sector.name[locale]}
                  </h3>
                  <p className="text-accbcf-gray text-xs leading-relaxed line-clamp-3">
                    {sector.description[locale]}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-accbcf-blue group-hover:text-accbcf-orange transition-colors">
                  <span>{t.learnMore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
