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
    id: 'slide-fmiti',
    image: '/images/forum/fmiti-headquarters-handshake.jpg',
    alt: 'Federal Ministry of Industry, Trade and Investment Abuja - Bilateral Handshake under President Tinubu Portrait',
    tagEn: 'Federal Ministerial Headquarters',
    tagZh: '联邦部委总部会谈',
    captionEn: 'Bilateral Engagement at Federal Ministry of Industry, Trade & Investment, Abuja HQ',
    captionZh: '阿布贾联邦工贸投部大院：官方双边会谈与产业对接',
  },
  {
    id: 'slide-council',
    image: '/images/forum/leadership-council-assembly.jpg',
    alt: 'ACCBCF Executive Leadership Council Assembly with High Chief Zhang Xiaopeng and Bilateral State Portraits',
    tagEn: 'Executive Leadership Assembly',
    tagZh: '执行理事会官方会谈',
    captionEn: 'High Chief Zhang Xiaopeng & Leadership Council with Bilateral State Portraits',
    captionZh: '论坛全国主席张晓鹏高级酋长与理事会高层官方会晤',
  },
  {
    id: 'slide-diplomatic',
    image: '/images/forum/diplomatic-assembly-abuja.jpg',
    alt: 'Plenary Assembly of International Ambassadors, Envoys and Continental Leaders in Abuja',
    tagEn: 'Diplomatic Plenary Assembly',
    tagZh: '国际外交使团与理事大会',
    captionEn: 'Plenary Reception of Ambassadors, Continental Envoys & Institutional Leaders',
    captionZh: '汇聚各国驻阿布贾外交使团、特使与多边机构领袖',
  },
  {
    id: 'slide-ooni',
    image: '/images/forum/02.jpeg',
    alt: 'His Imperial Majesty The Ooni of Ife and ACCBCF Leadership in Traditional Regalia',
    tagEn: 'Sovereign & Royal Patronage',
    tagZh: '主权王室级高级顾问',
    captionEn: 'His Imperial Majesty The Ooni of Ife & Sovereign Traditional Councils',
    captionZh: '非洲传统王室领袖与高级顾问委员会协同',
  },
  {
    id: 'slide-obasanjo',
    image: '/images/forum/12-presidential.jpeg',
    alt: 'Former President Olusegun Obasanjo and ACCBCF Leadership',
    tagEn: 'Bilateral Statesmanship',
    tagZh: '元首级双边战略对话',
    captionEn: 'Presidential Diplomatic Engagement & Continental Strategic Vision',
    captionZh: '前国家元首会晤与高水平战略对话',
  },
  {
    id: 'slide-ambassador',
    image: '/images/forum/ambassadorial-dialogue.jpg',
    alt: 'Bilateral Handshake with International Ambassador in Abuja',
    tagEn: 'Ambassadorial Bilateral Dialogue',
    tagZh: '驻地大使双边战略对话',
    captionEn: 'Deepening South-South Diplomatic & Investment Synergies',
    captionZh: '深化南南合作外交协同与跨境战略投资互联',
  },
  {
    id: 'slide-boardroom',
    image: '/images/forum/executive-boardroom-session.jpg',
    alt: 'Executive Boardroom Bilateral Working Session with National Flags',
    tagEn: 'Bilateral Working Session',
    tagZh: '双边闭门工作会议',
    captionEn: 'Strategic Trade Alignment, Investment Pipelines & Policy Coordination',
    captionZh: '双边产业对接、重点项目管道与跨国合资布局',
  },
  {
    id: 'slide-gala',
    image: '/images/forum/bilateral-gala-reception.jpg',
    alt: 'Bilateral Gala Reception and Enterprise Partnership Handshake',
    tagEn: 'Bilateral Forum Gala',
    tagZh: '双边经贸领袖盛宴',
    captionEn: 'Uniting Sovereign Capital and African-Chinese Enterprise Champions',
    captionZh: '凝聚战略资本与非中领军企业代表',
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

        {/* 2. Light Cinematic Contrast Overlay - Lets the DSLR photography shine vibrantly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001026]/75 via-transparent to-[#001026]/85" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* 3. Foreground Content: Bold, Authoritative, Institutional Typography with Elegant Frosted Diplomatic Card */}
      <div className="relative max-w-4xl mx-auto text-center z-10 w-full px-2 sm:px-4">
        <div className="bg-[#001226]/65 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.65)] space-y-6">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-accbcf-gold/70 backdrop-blur-md text-xs sm:text-sm font-bold text-accbcf-gold tracking-wider shadow-xl">
              <Shield className="w-3.5 h-3.5 text-accbcf-gold" />
              <span>{t.tag}</span>
            </div>
          </motion.div>

          {/* BOLD Authoritative Headline */}
          <div className="space-y-2">
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
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

          {/* BOLD Slogan */}
          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-white/95 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-bold tracking-wide bg-black/50 hover:bg-black/70 text-white hover:text-accbcf-gold border-2 border-white/40 hover:border-accbcf-gold backdrop-blur-md transition-all duration-200 shadow-2xl"
            >
              <Globe2 className="w-4 h-4 text-accbcf-gold" />
              <span>{t.ctaSecondary}</span>
            </Link>
          </div>

          {/* Credibility Micro-Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white/90 shadow-md">
              <span className="w-2 h-2 rounded-full bg-accbcf-gold" />
              <span>{SITE_INFO.established}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white/90 shadow-md">
              <Building2 className="w-3.5 h-3.5 text-accbcf-gold" />
              <span>{SITE_INFO.hqCity[locale]}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white/90 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>G2G · G2B · B2B · B2C</span>
            </div>
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
        {/* Clickable Progress Bars & Slide Counter */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-extrabold text-accbcf-gold bg-black/60 px-2.5 py-1 rounded-full border border-accbcf-gold/30 backdrop-blur-sm">
            0{currentSlide + 1} <span className="text-white/40">/</span> 0{HERO_SLIDES.length}
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`group relative h-2 transition-all rounded-full overflow-hidden ${
                    isActive ? 'w-8 sm:w-12 bg-white/20' : 'w-3 sm:w-5 bg-white/25 hover:bg-white/40'
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
