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
  Globe2,
  Camera,
} from 'lucide-react';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface HeroProps {
  locale: Locale;
}

const HERO_SLIDES = [
  {
    id: 'slide-hm2',
    image: '/images/forum/web/slide-hm2.jpg',
    alt: 'High Chief Zhang Xiaopeng and Honorable Member at National Assembly House of Representatives Abuja',
    tagEn: 'National Assembly Dialogue',
    tagZh: '联邦国民议会双边对话',
    captionEn: 'Parliamentary Strategic Engagement at House of Representatives, Abuja',
    captionZh: '尼日利亚联邦众议院官方战略对话与立法政策协同',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-dsc-0864',
    image: '/images/forum/web/slide-dsc-0864.jpg',
    alt: 'ACCBCF Executive Leadership Consultation at National Secretariat under Official State Portraits',
    tagEn: 'National Secretariat Deliberation',
    tagZh: '国家秘书处常务决策会议',
    captionEn: 'High Chief Zhang Xiaopeng Presiding Over Council Executive Deliberations',
    captionZh: '论坛全国主席张晓鹏高级酋长主持理事会核心高层决策会晤',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-12',
    image: '/images/forum/web/slide-12.jpg',
    alt: 'High Chief Zhang Xiaopeng in Ceremonial Agbada with Envoys under Bilateral Presidential Portraits',
    tagEn: 'Bilateral Diplomatic Reception',
    tagZh: '多元双边外交会晤',
    captionEn: 'High Chief Zhang Xiaopeng with Envoys under Presidential Auspices',
    captionZh: '全国主席张晓鹏高级酋长与外交特使在尼日利亚及赞比亚元首画像前会晤',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-44',
    image: '/images/forum/web/slide-44.jpg',
    alt: 'High Chief Zhang Xiaopeng in Royal Chieftaincy Attire and Council Leaders at Continental Plenary Summit',
    tagEn: 'Continental Plenary Summit',
    tagZh: '全非峰会全体大会',
    captionEn: 'High Chief Zhang Xiaopeng & Dignitaries Addressing Continental Delegation',
    captionZh: '全国主席张晓鹏高级酋长与杰出代表出席全非多边经贸峰会开幕大典',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-wa0042',
    image: '/images/forum/web/slide-wa0042.jpg',
    alt: 'High Chief Zhang Xiaopeng in Royal Attire with Executive Government Leadership under President Tinubu Portrait',
    tagEn: 'Ministerial Executive Reception',
    tagZh: '联邦部级高层会晤',
    captionEn: 'Strategic Bilateral Consultation with High-Ranking Government Leadership',
    captionZh: '全国主席张晓鹏高级酋长与联邦高级官员就重大合资项目深入探讨',
    objectPosition: 'object-[center_20%]',
  },
  {
    id: 'slide-26',
    image: '/images/forum/web/slide-26.jpg',
    alt: 'High Chief Zhang Xiaopeng Presenting Official Bilateral Insignia to Diplomatic Envoys under Presidential Auspices',
    tagEn: 'Diplomatic Insignia Presentation',
    tagZh: '官方礼仪与外交礼聘',
    captionEn: 'Official Bilateral Protocol & Diplomatic Gift Exchange in Abuja',
    captionZh: '全国主席张晓鹏高级酋长与驻地特命全权大使互致官方最高礼节',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-dsc-1418',
    image: '/images/forum/web/slide-dsc-1418.jpg',
    alt: 'High Chief Zhang Xiaopeng and Council Executive at National Office with Cultural Promoter Award',
    tagEn: 'Cultural & Trade Promotion',
    tagZh: '文化经贸双重引领',
    captionEn: 'China-Nigeria Strategic Alignment & Forum Leadership at National Office',
    captionZh: '中非文化经贸促进发展：全国主席张晓鹏高级酋长官方工作会谈',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-21',
    image: '/images/forum/web/slide-21.jpg',
    alt: 'High Chief Zhang Xiaopeng in Official Handshake with Distinguished Leader',
    tagEn: 'Strategic Bilateral Partnership',
    tagZh: '高层战略合作握手',
    captionEn: 'High Chief Zhang Xiaopeng Solidifying Bilateral Economic Alliances',
    captionZh: '全国主席张晓鹏高级酋长与政商领袖正式会晤共谋合作发展',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-dsc-0930',
    image: '/images/forum/web/slide-dsc-0930.jpg',
    alt: 'High Chief Zhang Xiaopeng and Diplomatic Official in Front of African Union and National Flags',
    tagEn: 'Multilateral Diplomacy',
    tagZh: '多边战略对话',
    captionEn: 'High Chief Zhang Xiaopeng in Bilateral Engagement with Diplomatic Envoys',
    captionZh: '全国主席张晓鹏高级酋长与外交使节推进非中多边战略互信',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-dsc-2911',
    image: '/images/forum/web/slide-dsc-2911.jpg',
    alt: 'Executive Council Consultations at ACCBCF Headquarters with Distinguished Council Members',
    tagEn: 'Executive Council Secretariat',
    tagZh: '理事会执行秘书处',
    captionEn: 'Advancing Bilateral Trade Corridors & Institutional Strategic Plans',
    captionZh: '中非商务理事会国家总部：推进重点产业走廊与机制化协同',
    objectPosition: 'object-center',
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
    ? ['非洲', '中国', '会长', '论坛']
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
              className={`object-cover ${HERO_SLIDES[currentSlide].objectPosition || 'object-center'}`}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* 2. Seamless Cinematic Overlay - Uniform and natural across the whole photo, NO blocking boxes */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001026]/70 via-transparent to-[#001026]/80" />
      </div>

      {/* 3. Foreground Content: Bold, Authoritative Typography directly on the full-bleed photograph */}
      <div className="relative max-w-5xl mx-auto text-center z-10 w-full px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7">
        {/* BOLD Authoritative Headline (Only displayed on the 1st slide; hidden on other slides while maintaining layout flow so below content stays in position) */}
        <div
          className={`space-y-2 transition-opacity duration-700 ease-in-out ${
            currentSlide === 0
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none select-none'
          }`}
          aria-hidden={currentSlide !== 0}
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.25,
                },
              },
            }}
            className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] [text-shadow:_0_2px_14px_rgb(0_0_0_/_90%),_0_6px_30px_rgb(0_0_0_/_95%)]"
          >
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="inline-block mr-2 sm:mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {locale === 'en' ? (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: 'easeOut' }}
              className="text-base sm:text-lg font-sans font-extrabold text-accbcf-gold tracking-[0.25em] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_10px_rgb(0_0_0_/_90%)]"
            >
              {t.chineseTitle}
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: 'easeOut' }}
              className="text-sm sm:text-base font-sans font-bold text-accbcf-gold tracking-widest uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
            >
              Africa China Chairmen of Business Forum
            </motion.p>
          )}
        </div>

        {/* BOLD Slogan with Gentle Upward Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-relaxed drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_12px_rgb(0_0_0_/_90%)] px-2">
            {t.slogan}
          </p>
        </motion.div>

        {/* Action CTAs: High Contrast & High Visibility */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1"
        >
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
        </motion.div>
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
            {String(currentSlide + 1).padStart(2, '0')} <span className="text-white/40">/</span> {String(HERO_SLIDES.length).padStart(2, '0')}
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
                      key={`${currentSlide}-${isPaused}`}
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '0%' : '100%' }}
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs text-white/90 shadow-lg overflow-hidden">
          <Camera className="w-3.5 h-3.5 text-accbcf-gold flex-shrink-0" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2"
            >
              <span className="font-bold text-accbcf-gold">
                {isZh ? HERO_SLIDES[currentSlide].tagZh : HERO_SLIDES[currentSlide].tagEn}
              </span>
              <span className="hidden md:inline text-white/40">|</span>
              <span className="hidden md:inline text-white/80 line-clamp-1">
                {isZh ? HERO_SLIDES[currentSlide].captionZh : HERO_SLIDES[currentSlide].captionEn}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="hidden lg:flex absolute bottom-2 left-1/2 -translate-x-1/2 text-white/40 flex-col items-center gap-0.5 text-[9px] tracking-widest uppercase animate-bounce pointer-events-none">
        <ChevronDown className="w-3.5 h-3.5 text-accbcf-gold/70" />
      </div>
    </section>
  );
};
