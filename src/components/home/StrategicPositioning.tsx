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
    <section id="strategic-positioning" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accbcf-blue-deep via-[#001D3D] to-accbcf-blue-deep text-white border-y-2 border-accbcf-gold/30 relative overflow-hidden shadow-2xl">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accbcf-gold/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accbcf-blue/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accbcf-gold/15 border border-accbcf-gold/40 text-xs font-bold uppercase tracking-wider text-accbcf-gold">
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
            {t.title}
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
          <p className="text-xs text-accbcf-gold font-medium tracking-wide">
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
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
              {/* Animated highlighted connection line */}
              <motion.line
                x1="100"
                y1="20"
                x2="700"
                y2="20"
                stroke="#F0B428"
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
                      ? 'bg-gradient-to-br from-accbcf-blue to-accbcf-blue-dark text-white shadow-2xl scale-105 border-accbcf-gold ring-2 ring-accbcf-gold'
                      : 'bg-white/10 text-white hover:bg-white/15 hover:border-accbcf-gold/50 border-white/15 backdrop-blur-md'
                  }`}
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors ${
                      isSelected
                        ? 'bg-accbcf-gold text-accbcf-charcoal shadow-lg font-bold'
                        : 'bg-white/15 text-accbcf-gold shadow-sm'
                    }`}
                  >
                    {getIcon(model.code)}
                  </div>
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-accbcf-gold'
                      }`}
                    >
                      {model.code}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base mt-2 text-white">
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
            className="max-w-4xl mx-auto rounded-2xl bg-white/10 backdrop-blur-md p-8 sm:p-10 border border-accbcf-gold/50 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold font-mono px-3.5 py-1.5 bg-accbcf-gold text-accbcf-charcoal rounded-lg shadow-md">
                    {activeModel.code}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {activeModel.title[locale]}
                  </h3>
                </div>
                <p className="text-accbcf-gold text-base sm:text-lg leading-relaxed font-semibold">
                  {activeModel.shortDesc[locale]}
                </p>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed">
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
