'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Building2,
  Globe2,
  Camera,
} from 'lucide-react';
import { UI_STRINGS } from '@/lib/translations';
import { SITE_INFO } from '@/lib/content';
import type { Locale } from '@/lib/content';

interface HeroProps {
  locale: Locale;
}

const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: '/images/forum/02.jpeg',
    alt: 'His Imperial Majesty The Ooni of Ife and ACCBCF Leadership in Traditional Regalia',
    tagEn: 'Sovereign & Royal Patronage',
    tagZh: '主权王室级高级顾问',
    captionEn: 'Royal & Sovereign Traditional Leadership of Africa',
    captionZh: '非洲传统王室领袖与高级顾问委员会',
  },
  {
    id: 'slide-2',
    image: '/images/forum/12-presidential.jpeg',
    alt: 'Former President Olusegun Obasanjo and ACCBCF Leadership',
    tagEn: 'Bilateral Statesmanship',
    tagZh: '元首级双边战略对话',
    captionEn: 'Presidential Diplomatic Engagement & Strategic Vision',
    captionZh: '前国家元首会晤与高水平战略对话',
  },
  {
    id: 'slide-3',
    image: '/images/forum/05.jpeg',
    alt: 'Governor Chukwuma Soludo and ACCBCF Leadership',
    tagEn: 'Sub-National Economic Engines',
    tagZh: '省级地方政府产业对接',
    captionEn: 'State Governors & Strategic Industrialization Alliances',
    captionZh: '州长高层对话与跨国产业基地协同',
  },
  {
    id: 'slide-4',
    image: '/images/forum/07.jpeg',
    alt: 'Northern Traditional Emirs and ACCBCF Forum Leadership',
    tagEn: 'Regional Consensual Governance',
    tagZh: '区域传统王室与经贸共识',
    captionEn: 'Prominent Traditional Councils & Regional Stakeholders',
    captionZh: '区域传统领袖与社会投资环境保障',
  },
  {
    id: 'slide-5',
    image: '/images/forum/01.jpeg',
    alt: 'Africa China Bilateral Leadership Assembly',
    tagEn: 'Bilateral Business Assembly',
    tagZh: '非中经贸领袖闭门盛会',
    captionEn: 'Connecting Sovereigns, Strategic Capital & Enterprise Champions',
    captionZh: '贯通主权政府、战略资本与领军企业',
  },
  {
    id: 'slide-6',
    image: '/images/forum/06.jpeg',
    alt: 'Official Bilateral Dignitary Handshake and Partnership',
    tagEn: 'Institutional Partnership',
    tagZh: '部委与机构高层协同',
    captionEn: 'Cross-Border Investment Facilitation & Market Access',
    captionZh: '跨境投资促进与重大合作项目落地',
  },
];

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].hero;
  const isZh = locale === 'zh';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay timer every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const words = isZh
    ? ['非中', '企业', '领袖', '论坛']
    : ['Africa', 'China', 'Chairmen', 'of', 'Business', 'Forum'];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
    >
      {/* 1. Background Photo Slider with Subtle Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#00142e]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].alt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* 2. Multi-tier High-Contrast Gradient Balancing Overlays */}
        {/* Tint 1: Deep Navy base tint allowing vibrant colors to show while subduing raw glare */}
        <div className="absolute inset-0 bg-[#001733]/65" />

        {/* Tint 2: Atmospheric vertical gradient, dark at top and bottom for header & controls, rich contrast in center */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001226]/95 via-[#00264d]/80 to-[#001226]/95" />

        {/* Tint 3: Radial focus vignette highlighting center typography */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,25,55,0.7)_0%,rgba(0,12,28,0.95)_100%)]" />

        {/* Tint 4: Subtle Gold & Red Ambient Warmth */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-gradient-to-tr from-accbcf-gold/15 via-accbcf-red/10 to-transparent filter blur-3xl pointer-events-none" />

        {/* Faint African Continent Contour */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-end pr-16 opacity-15"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 600 700"
            className="w-[480px] max-h-[75vh] object-contain"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 280,45 C 310,40 370,50 410,75 C 435,90 450,115 440,140 C 430,165 410,180 435,210 C 460,240 500,260 520,300 C 535,330 520,360 485,380 C 455,400 440,430 430,470 C 420,510 405,560 380,600 C 350,650 320,680 290,680 C 275,680 260,650 250,610 C 240,560 215,500 200,440 C 185,380 150,350 110,335 C 70,320 40,300 45,260 C 50,220 90,195 130,180 C 170,165 190,150 210,110 C 230,70 250,50 280,45 Z"
              stroke="#F0B428"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>

      {/* 3. Foreground Content: Bold, Authoritative, Institutional Typography */}
      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-6 sm:space-y-8">
        {/* Emblem & Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-col items-center justify-center"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white p-1 shadow-[0_0_35px_rgba(0,0,0,0.8)] ring-4 ring-accbcf-gold mb-3 group hover:scale-105 transition-transform duration-200">
            <Image
              src="/images/accbcf-emblem.jpg"
              alt="ACCBCF Official Emblem"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-accbcf-gold/60 backdrop-blur-md text-xs sm:text-sm font-bold text-accbcf-gold tracking-wider shadow-xl">
            <Shield className="w-3.5 h-3.5 text-accbcf-gold" />
            <span>{t.tag}</span>
          </div>
        </motion.div>

        {/* BOLD Authoritative Headline */}
        <div className="space-y-2">
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            {words.map((word, idx) => (
              <span key={idx} className="inline-block mr-2 sm:mr-3">
                {word}
              </span>
            ))}
          </h1>
          {locale === 'en' ? (
            <p className="text-base sm:text-lg font-sans font-extrabold text-accbcf-gold tracking-[0.25em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              {t.chineseTitle}
            </p>
          ) : (
            <p className="text-sm sm:text-base font-sans font-bold text-accbcf-gold tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Africa China Chairmen of Business Forum
            </p>
          )}
        </div>

        {/* BOLD Slogan with Frosted Card Accent */}
        <div className="max-w-3xl mx-auto">
          <p className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] px-4 py-2">
            {t.slogan}
          </p>
        </div>

        {/* Action CTAs: High Contrast & High Visibility */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
          <Link
            href={`/${locale}/contact`}
            className="sheen-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-sm sm:text-base font-extrabold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal hover:bg-accbcf-gold-light hover:shadow-[0_0_30px_rgba(240,180,40,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 shadow-2xl"
          >
            <span>{t.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={`#strategic-positioning`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-bold tracking-wide bg-black/40 hover:bg-black/60 text-white hover:text-accbcf-gold border-2 border-white/40 hover:border-accbcf-gold backdrop-blur-md transition-all duration-200 shadow-2xl"
          >
            <Globe2 className="w-4 h-4 text-accbcf-gold" />
            <span>{t.ctaSecondary}</span>
          </Link>
        </div>

        {/* Credibility Micro-Strip */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/55 border border-white/20 backdrop-blur-md text-white/90 shadow-md">
            <span className="w-2 h-2 rounded-full bg-accbcf-gold" />
            <span>{SITE_INFO.established}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/55 border border-white/20 backdrop-blur-md text-white/90 shadow-md">
            <Building2 className="w-3.5 h-3.5 text-accbcf-gold" />
            <span>{SITE_INFO.hqCity[locale]}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/55 border border-white/20 backdrop-blur-md text-white/90 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>G2G · G2B · B2B · B2C</span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Slider Controls */}
      {/* Desktop Prev/Next Circular Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-accbcf-gold hover:text-accbcf-charcoal text-white/90 border border-white/20 backdrop-blur-md items-center justify-center transition-all shadow-xl focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-accbcf-gold hover:text-accbcf-charcoal text-white/90 border border-white/20 backdrop-blur-md items-center justify-center transition-all shadow-xl focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Bar: Slide Progress Bars & Photo Context Pill */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Clickable Progress Bars */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`group relative h-2 transition-all rounded-full overflow-hidden ${
                  isActive ? 'w-10 sm:w-14 bg-white/20' : 'w-4 sm:w-6 bg-white/25 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {isActive && (
                  <motion.div
                    key={currentSlide}
                    initial={{ width: '0%' }}
                    animate={{ width: isPaused ? '100%' : '100%' }}
                    transition={{ duration: isPaused ? 0 : 6, ease: 'linear' }}
                    className="absolute inset-0 bg-accbcf-gold rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Current Photo Context Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs text-white/90 shadow-lg">
          <Camera className="w-3.5 h-3.5 text-accbcf-gold flex-shrink-0" />
          <span className="font-bold text-accbcf-gold">
            {isZh ? HERO_SLIDES[currentSlide].tagZh : HERO_SLIDES[currentSlide].tagEn}
          </span>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:inline text-white/80 line-clamp-1">
            {isZh ? HERO_SLIDES[currentSlide].captionZh : HERO_SLIDES[currentSlide].captionEn}
          </span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="hidden lg:flex absolute bottom-2 left-1/2 -translate-x-1/2 text-white/40 flex-col items-center gap-0.5 text-[9px] tracking-widest uppercase animate-bounce pointer-events-none">
        <ChevronDown className="w-3.5 h-3.5 text-accbcf-gold/70" />
      </div>
    </section>
  );
};
