'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Landmark,
  Factory,
  TrendingUp,
  Globe,
  CreditCard,
  Megaphone,
} from 'lucide-react';
import { PLATFORM_ADVANTAGES } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface AdvantagesGridProps {
  locale: Locale;
}

// Stat Counter Component animating from 0 to value on scroll-into-view
const AnimatedStat: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!inView) return;

    // Extract numeric portion
    const match = value.match(/\d+/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(match[0], 10);
    const suffix = value.replace(match[0], '');
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetNum);

      setDisplayValue(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

export const AdvantagesGrid: React.FC<AdvantagesGridProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].advantages;

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 transition-colors duration-150' };
    switch (iconName) {
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Factory':
        return <Factory {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'CreditCard':
        return <CreditCard {...props} />;
      case 'Megaphone':
        return <Megaphone {...props} />;
      default:
        return <Globe {...props} />;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto space-y-16">
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

        {/* 6 Advantages Cards with Animated Stat Counters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLATFORM_ADVANTAGES.map((adv, idx) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-accbcf-light border border-gray-200/80 hover:border-accbcf-gold/50 shadow-sm hover:shadow-lg transition-all duration-150 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Icon shifts from gold to orange on hover */}
                  <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-accbcf-orange/10 flex items-center justify-center text-accbcf-gold group-hover:text-accbcf-orange shadow-sm transition-colors duration-150">
                    {renderIcon(adv.icon)}
                  </div>
                  {/* Metric Display */}
                  <div className="text-right">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-accbcf-blue group-hover:text-accbcf-orange transition-colors">
                      <AnimatedStat value={adv.stat} />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-accbcf-gray">
                      {adv.statLabel[locale]}
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-accbcf-charcoal mb-3 group-hover:text-accbcf-blue transition-colors">
                  {adv.title[locale]}
                </h3>
                <p className="text-accbcf-gray text-sm leading-relaxed">
                  {adv.description[locale]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
