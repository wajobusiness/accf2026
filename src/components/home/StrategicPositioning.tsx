'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Building, Briefcase, Coins, CheckCircle, ArrowRight } from 'lucide-react';
import { STRATEGIC_MODELS } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface StrategicPositioningProps {
  locale: Locale;
}

export const StrategicPositioning: React.FC<StrategicPositioningProps> = ({ locale }) => {
  const [activeCode, setActiveCode] = useState<string>('G2G');
  const t = UI_STRINGS[locale].strategic;

  const getIcon = (code: string) => {
    switch (code) {
      case 'G2G':
        return <Landmark className="w-6 h-6" />;
      case 'G2B':
        return <Building className="w-6 h-6" />;
      case 'B2B':
        return <Briefcase className="w-6 h-6" />;
      case 'B2C':
        return <Coins className="w-6 h-6" />;
      default:
        return <Landmark className="w-6 h-6" />;
    }
  };

  const activeModel = STRATEGIC_MODELS.find((m) => m.code === activeCode) || STRATEGIC_MODELS[0];

  return (
    <section id="strategic-positioning" className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accbcf-blue/10 border border-accbcf-blue/20 text-xs font-bold uppercase tracking-wider text-accbcf-blue">
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-accbcf-charcoal font-bold">
            {t.title}
          </h2>
          <p className="text-accbcf-gray text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
          <p className="text-xs text-accbcf-blue font-semibold tracking-wide">
            {t.hoverPrompt}
          </p>
        </div>

        {/* Four Connected Nodes Visualizer */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting SVG lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 pointer-events-none z-0">
            <svg className="w-full h-12" viewBox="0 0 800 40" fill="none">
              {/* Background trace line */}
              <line
                x1="100"
                y1="20"
                x2="700"
                y2="20"
                stroke="#E5E7EB"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
              {/* Animated highlighted connection line */}
              <motion.line
                x1="100"
                y1="20"
                x2="700"
                y2="20"
                stroke="#0064B4"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* 4 Interactive Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {STRATEGIC_MODELS.map((model, idx) => {
              const isSelected = activeCode === model.code;
              return (
                <motion.div
                  key={model.code}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  onClick={() => setActiveCode(model.code)}
                  onMouseEnter={() => setActiveCode(model.code)}
                  className={`cursor-pointer rounded-2xl p-6 text-center transition-all duration-300 relative border ${
                    isSelected
                      ? 'bg-accbcf-blue text-white shadow-xl scale-105 border-accbcf-gold ring-2 ring-accbcf-gold/50'
                      : 'bg-accbcf-light text-accbcf-charcoal hover:bg-white hover:shadow-md border-gray-200'
                  }`}
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors ${
                      isSelected
                        ? 'bg-accbcf-gold text-accbcf-charcoal shadow-inner font-bold'
                        : 'bg-white text-accbcf-blue shadow-sm'
                    }`}
                  >
                    {getIcon(model.code)}
                  </div>
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-accbcf-blue/10 text-accbcf-blue'
                      }`}
                    >
                      {model.code}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base mt-2">
                      {model.title[locale]}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Model Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel.code}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-accbcf-blue/5 via-accbcf-light to-accbcf-blue/5 p-8 border border-accbcf-gold/40 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold font-mono px-3 py-1 bg-accbcf-blue text-white rounded-lg">
                    {activeModel.code}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-accbcf-charcoal">
                    {activeModel.title[locale]}
                  </h3>
                </div>
                <p className="text-accbcf-charcoal text-sm sm:text-base leading-relaxed font-medium">
                  {activeModel.shortDesc[locale]}
                </p>
                <p className="text-accbcf-gray text-xs sm:text-sm leading-relaxed">
                  {activeModel.detail[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
