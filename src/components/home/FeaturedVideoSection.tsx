'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Compass,
  Video as VideoIcon,
  ExternalLink,
} from 'lucide-react';
import type { Locale } from '@/lib/content';
import type { VideoItem } from '@/lib/videoService';

interface FeaturedVideoSectionProps {
  locale: Locale;
  featuredVideo?: VideoItem;
}

interface SectionI18n {
  badge: string;
  title: string;
  subtitle: string;
  videoBadge: string;
  playPrompt: string;
  stopPrompt: string;
  ctaPrimary: string;
  ctaSecondary: string;
  exploreAllVideos: string;
}

const SECTION_I18N: Record<Locale, SectionI18n> = {
  en: {
    badge: 'Official Keynote & Presentation',
    title: 'Bilateral Vision in Action · Connecting Africa & China',
    subtitle:
      'Experience official broadcasts, keynote addresses, and high-level bilateral dialogues from the Africa China Chairmen of Business Forum (ACCBCF).',
    videoBadge: 'Official 4K / HD Broadcast Dispatch',
    playPrompt: 'Watch Official Video Presentation',
    stopPrompt: 'Return to Cover',
    ctaPrimary: 'Explore Priority Sectors',
    ctaSecondary: 'Summit Delegate Inquiries',
    exploreAllVideos: 'View All Channel Videos',
  },
  zh: {
    badge: '官方主旨推介与实况展播',
    title: '跨越洲际桥梁 · 共创中非经贸繁荣新篇章',
    subtitle:
      '观看非洲中国会长论坛（ACCBCF）官方实况展播与高端双边对话，全方位领略中非经贸投资机制、十二大重点产业发展走廊及2026阿布贾全球成立大会的历史性战略布局。',
    videoBadge: '官方超高清 4K / 1080P 双语呈献',
    playPrompt: '点击播放官方推介视频',
    stopPrompt: '返回封面',
    ctaPrimary: '了解十二大重点产业',
    ctaSecondary: '成立大会代表参会申请',
    exploreAllVideos: '查看全部官方视频',
  },
  fr: {
    badge: 'Allocution Principale & Présentation',
    title: 'Vision Bilatérale en Action · Relier l’Afrique et la Chine',
    subtitle:
      'Découvrez les diffusions officielles et les dialogues bilatéraux de haut niveau du Forum des Présidents d’Entreprises Afrique-Chine (ACCBCF).',
    videoBadge: 'Diffusion Officielle Haute Définition',
    playPrompt: 'Visionner la Présentation Officielle',
    stopPrompt: 'Retour à la Couverture',
    ctaPrimary: 'Explorer les Secteurs Prioritaires',
    ctaSecondary: 'Délégation au Sommet & Contact',
    exploreAllVideos: 'Voir toutes les vidéos',
  },
  ar: {
    badge: 'العرض المرئي والكلمة الافتتاحية الرسمية',
    title: 'رؤية ثنائية في العمل · مد جسور التعاون بين إفريقيا والصين',
    subtitle:
      'شاهد البث الرسمي ومداولات الحوار الثنائي لمنتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية (ACCBCF).',
    videoBadge: 'بث رسمي عالي الدقة 4K / HD',
    playPrompt: 'مشاهدة العرض المرئي الرسمي',
    stopPrompt: 'العودة إلى الغلاف',
    ctaPrimary: 'استكشاف القطاعات ذات الأولوية',
    ctaSecondary: 'التسجيل في القمة والتواصل',
    exploreAllVideos: 'عرض جميع الفيديوهات',
  },
  pt: {
    badge: 'Discurso Principal e Apresentação Oficial',
    title: 'Visão Bilateral em Ação · Conectando a África e a China',
    subtitle:
      'Assista às transmissões oficiais e diálogos bilaterais de alto nível do Fórum de Presidentes de Negócios África–China (ACCBCF).',
    videoBadge: 'Transmissão Oficial em Alta Definição',
    playPrompt: 'Assistir à Apresentação Oficial',
    stopPrompt: 'Voltar à Capa',
    ctaPrimary: 'Explorar Setores Prioritários',
    ctaSecondary: 'Inscrição de Delegados na Cúpula',
    exploreAllVideos: 'Ver todos os vídeos',
  },
};

const DEFAULT_YOUTUBE_VIDEO_ID = 'iWhDtiAuaBs';

export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({
  locale,
  featuredVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = SECTION_I18N[locale] || SECTION_I18N.en;
  const isRtl = locale === 'ar';

  const videoId = featuredVideo?.youtubeVideoId || DEFAULT_YOUTUBE_VIDEO_ID;
  const videoTitle = featuredVideo?.title || 'Africa China Chairmen Forum Official Broadcast';
  const eventName = featuredVideo?.eventName || 'Africa China Chairmen of Business Forum';
  const coverThumb =
    featuredVideo?.thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section
      id="official-video"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#040A17] text-white overflow-hidden border-b border-accbcf-gold/20"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-accbcf-gold/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-accbcf-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Diplomatic Geometric Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-6xl mx-auto space-y-12 sm:space-y-16 z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accbcf-gold/15 border border-accbcf-gold/40 text-xs font-bold uppercase tracking-widest text-accbcf-gold shadow-lg shadow-accbcf-gold/5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.18]">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Video Theater Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Outer Gold Border Halo */}
          <div className="relative p-[1.5px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-accbcf-gold via-amber-300/40 to-accbcf-gold/20 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(240,180,40,0.15)]">
            <div className="relative rounded-[15px] sm:rounded-[22px] overflow-hidden bg-black aspect-video">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  /* Video Poster / Interactive Cover */
                  <motion.div
                    key="cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full group cursor-pointer overflow-hidden"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Background Backdrop Image */}
                    <img
                      src={coverThumb}
                      alt={videoTitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.80] contrast-[1.05]"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const hqUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        if (target.src !== hqUrl) {
                          target.src = hqUrl;
                        }
                      }}
                    />

                    {/* Dark Dramatic Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040A17] via-black/40 to-[#040A17]/70" />

                    {/* Top Header Tags */}
                    <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white/90 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span className="w-2 h-2 -ml-3 rounded-full bg-red-500" />
                        <span>{t.videoBadge}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accbcf-gold/90 text-accbcf-charcoal text-[11px] sm:text-xs font-bold shadow-lg">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>ACCBCF Official</span>
                      </div>
                    </div>

                    {/* Centered Luxury Play Button with Ripple Aura */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-accbcf-gold/30 animate-ping opacity-60 pointer-events-none" />
                        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-accbcf-gold via-[#FBD76F] to-accbcf-gold text-accbcf-charcoal flex items-center justify-center shadow-[0_0_50px_rgba(240,180,40,0.8)] group-hover:scale-110 group-hover:shadow-[0_0_70px_rgba(240,180,40,1)] transition-all duration-300">
                          <Play className="w-7 h-7 sm:w-10 sm:h-10 fill-current translate-x-0.5 sm:translate-x-1" />
                        </div>
                      </div>

                      {/* Prompt Label */}
                      <span className="px-4 py-2 rounded-full bg-black/80 border border-accbcf-gold/40 backdrop-blur-md text-xs sm:text-sm font-bold tracking-wide text-white group-hover:text-accbcf-gold group-hover:border-accbcf-gold transition-all duration-300 shadow-xl max-w-[85%] text-center truncate">
                        {t.playPrompt}
                      </span>
                    </div>

                    {/* Bottom Metadata Ribbon */}
                    <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 flex items-end justify-between pointer-events-none">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-accbcf-gold/60 shadow-lg shrink-0 bg-white">
                          <Image
                            src="/images/accbcf-emblem.jpg"
                            alt="ACCBCF Official Seal"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="text-left max-w-md">
                          <p className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow line-clamp-1">
                            {videoTitle}
                          </p>
                          <p className="text-[10px] sm:text-xs text-accbcf-gold font-medium line-clamp-1">
                            {eventName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Active YouTube Stream */
                  <motion.div
                    key="player"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                      title={videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />

                    {/* Floating Return Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(false);
                      }}
                      className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white/90 hover:text-accbcf-gold border border-white/20 hover:border-accbcf-gold/50 backdrop-blur-md text-xs font-semibold shadow-lg transition-all"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{t.stopPrompt}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 sm:pt-4"
        >
          <Link
            href={`/${locale}/events#video-gallery`}
            className="sheen-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal hover:bg-accbcf-gold-light hover:shadow-[0_0_25px_rgba(240,180,40,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl"
          >
            <VideoIcon className="w-4 h-4" />
            <span>{t.exploreAllVideos}</span>
          </Link>

          <Link
            href={`/${locale}/sectors`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide bg-white/5 hover:bg-white/10 text-white hover:text-accbcf-gold border border-white/20 hover:border-accbcf-gold/50 backdrop-blur-md transition-all duration-200 shadow-xl"
          >
            <span>{t.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVideoSection;
