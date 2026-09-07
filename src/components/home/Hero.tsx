'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Building2, Globe2 } from 'lucide-react';
import { UI_STRINGS } from '@/lib/translations';
import { SITE_INFO } from '@/lib/content';
import type { Locale } from '@/lib/content';

interface HeroProps {
  locale: Locale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].hero;
  const isZh = locale === 'zh';

  // Desktop Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const continentX = useTransform(smoothMouseX, [-500, 500], [-12, 12]);
  const continentY = useTransform(smoothMouseY, [-500, 500], [-10, 10]);

  const glowX = useTransform(smoothMouseX, [-500, 500], [15, -15]);
  const glowY = useTransform(smoothMouseY, [-500, 500], [12, -12]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const words = isZh
    ? ['非中', '企业', '领袖', '论坛']
    : ['Africa', 'China', 'Chairmen', 'of', 'Business', 'Forum'];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accbcf-blue-deep via-accbcf-blue to-accbcf-blue-dark text-white overflow-hidden"
    >
      {/* Layer 1: Ambient Dragon Red-to-Gold Pulsing Glow */}
      <motion.div
        style={!isTouchDevice ? { x: glowX, y: glowY } : {}}
        className="absolute top-1/4 right-1/4 w-96 h-96 sm:w-[540px] sm:h-[540px] rounded-full bg-gradient-to-tr from-accbcf-red/30 via-accbcf-orange/25 to-accbcf-gold/35 pointer-events-none filter blur-3xl animate-dragon-glow"
        aria-hidden="true"
      />

      {/* Layer 2: Subtle China-Africa Motif Glow Left */}
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-accbcf-blue-dark/60 pointer-events-none filter blur-2xl"
        aria-hidden="true"
      />

      {/* Layer 3: Faint Gold African Continent SVG Outline Drawing In */}
      <motion.div
        style={!isTouchDevice ? { x: continentX, y: continentY } : {}}
        className="absolute inset-0 pointer-events-none flex items-center justify-center lg:justify-end lg:pr-12 opacity-35 sm:opacity-40"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 700"
          className="w-[320px] sm:w-[480px] lg:w-[620px] max-h-[85vh] object-contain drop-shadow-[0_0_20px_rgba(240,180,40,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 280,45 C 310,40 370,50 410,75 C 435,90 450,115 440,140 C 430,165 410,180 435,210 C 460,240 500,260 520,300 C 535,330 520,360 485,380 C 455,400 440,430 430,470 C 420,510 405,560 380,600 C 350,650 320,680 290,680 C 275,680 260,650 250,610 C 240,560 215,500 200,440 C 185,380 150,350 110,335 C 70,320 40,300 45,260 C 50,220 90,195 130,180 C 170,165 190,150 210,110 C 230,70 250,50 280,45 Z"
            stroke="#F0B428"
            strokeWidth="2.5"
            strokeDasharray="2400"
            strokeDashoffset="0"
            className="animate-trace-continent"
          />
          {/* Abuja Location Node with Pulsing Ping */}
          <g transform="translate(180, 270)">
            <circle cx="0" cy="0" r="16" fill="#F0B428" fillOpacity="0.3" className="animate-ping" />
            <circle cx="0" cy="0" r="7" fill="#DC0000" stroke="#FFFFFF" strokeWidth="2" />
            <text
              x="14"
              y="5"
              fill="#F0B428"
              fontSize="12"
              fontFamily="sans-serif"
              fontWeight="bold"
              letterSpacing="1"
            >
              ABUJA HQ
            </text>
          </g>
        </svg>
      </motion.div>

      {/* Layer 4: Main Institutional Hero Content */}
      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-6 sm:space-y-8">
        {/* Emblem Scale-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex flex-col items-center justify-center"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white p-1 shadow-2xl ring-4 ring-accbcf-gold/80 mb-3">
            <Image
              src="/images/accbcf-emblem.jpg"
              alt="ACCBCF Official Emblem"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold text-accbcf-gold tracking-wider">
            <Shield className="w-3.5 h-3.5 text-accbcf-gold" />
            <span>{t.tag}</span>
          </div>
        </motion.div>

        {/* Word-by-Word Headline Reveal */}
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-2 sm:mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          {locale === 'en' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-sm sm:text-base font-sans font-medium text-accbcf-gold tracking-widest uppercase"
            >
              {t.chineseTitle}
            </motion.p>
          )}
        </div>

        {/* Slogan Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="max-w-3xl mx-auto text-base sm:text-xl text-white/90 font-light leading-relaxed px-4"
        >
          {t.slogan}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          {/* Primary CTA with Magnetic feel & Gold Sheen Sweep */}
          <Link
            href={`/${locale}/contact`}
            className="sheen-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal hover:bg-accbcf-gold-light hover:shadow-[0_0_24px_rgba(240,180,40,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>{t.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href={`#strategic-positioning`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-white/10 text-white hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-200"
          >
            <Globe2 className="w-4 h-4 text-accbcf-gold" />
            <span>{t.ctaSecondary}</span>
          </Link>
        </motion.div>

        {/* Quick Credibility Micro-Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-white/70"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accbcf-gold" />
            <span>{SITE_INFO.established}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-accbcf-gold" />
            <span>{SITE_INFO.hqCity[locale]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>G2G · G2B · B2B · B2C</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1 text-[10px] tracking-wider uppercase animate-bounce">
        <ChevronDown className="w-4 h-4 text-accbcf-gold" />
      </div>
    </section>
  );
};
