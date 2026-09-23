'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  X,
  Calendar,
  Tag,
  ExternalLink,
  Sparkles,
  Video as VideoIcon,
  ShieldCheck,
  Radio,
  Youtube,
  CheckCircle2,
} from 'lucide-react';
import type { Locale } from '@/lib/content';
import type { VideoItem } from '@/lib/videoService';
import { OFFICIAL_YOUTUBE_CHANNEL } from '@/lib/youtubeSync';

interface EventVideosSectionProps {
  locale: Locale;
  videos: VideoItem[];
}

interface SectionI18n {
  badge: string;
  title: string;
  subtitle: string;
  featuredBadge: string;
  watchNow: string;
  closePlayer: string;
  openYouTube: string;
  noVideos: string;
  recordingDate: string;
  categoryLabel: string;
  allCategories: string;
  channelSubText: string;
  visitChannel: string;
  autoSyncBadge: string;
}

const I18N: Record<Locale, SectionI18n> = {
  en: {
    badge: 'Official YouTube Broadcast Dispatches & Summit Media',
    title: 'Summit Video Gallery & Official Recordings',
    subtitle:
      'High-definition video dispatches, keynote addresses, and bilateral interview recordings automatically synchronized from the official Africa China Chairmen Forum YouTube channel.',
    featuredBadge: 'Featured Broadcast',
    watchNow: 'Watch Recording',
    closePlayer: 'Close Video Player',
    openYouTube: 'Open on YouTube',
    noVideos: 'No video recordings gazetted at this time.',
    recordingDate: 'Recorded',
    categoryLabel: 'Sector Corridor',
    allCategories: 'All Videos',
    channelSubText: 'Official YouTube Channel',
    visitChannel: 'Subscribe on YouTube',
    autoSyncBadge: 'Live Auto-Sync Active',
  },
  zh: {
    badge: '官方 YouTube 影视展播与峰会实况',
    title: '盛会视频专栏与高端对话录像',
    subtitle:
      '非洲中国会长论坛（ACCBCF）双边峰会、部长级主旨演讲及战略合作企业领袖专访高清实况，与官方 YouTube 频道实时同步更新。',
    featuredBadge: '重点主旨展播',
    watchNow: '播放实况录像',
    closePlayer: '关闭视频播放器',
    openYouTube: '在 YouTube 打开',
    noVideos: '暂无已发布的视频实况。',
    recordingDate: '录制时间',
    categoryLabel: '合作走廊',
    allCategories: '全部视频',
    channelSubText: '官方 YouTube 频道',
    visitChannel: '关注官方频道',
    autoSyncBadge: '实时自动同步中',
  },
  fr: {
    badge: 'Diffusions Vidéo Officielles YouTube et Médias d’Événements',
    title: 'Galerie Vidéo du Sommet & Enregistrements Officiels',
    subtitle:
      'Retrouvez les discours liminaires, sessions plénières et entretiens bilatéraux du Forum des Présidents d’Entreprises Afrique-Chine synchronisés depuis YouTube.',
    featuredBadge: 'Diffusion Vedette',
    watchNow: 'Visionner l’Enregistrement',
    closePlayer: 'Fermer le Lecteur',
    openYouTube: 'Ouvrir sur YouTube',
    noVideos: 'Aucun enregistrement vidéo disponible pour le moment.',
    recordingDate: 'Enregistré le',
    categoryLabel: 'Secteur Prioritaire',
    allCategories: 'Toutes les vidéos',
    channelSubText: 'Chaîne YouTube Officielle',
    visitChannel: 'S’abonner sur YouTube',
    autoSyncBadge: 'Synchronisation Active',
  },
  ar: {
    badge: 'البث المرئي والتغطيات الرسمية عبر يوتيوب',
    title: 'معرض مرئيات القمة والتسجيلات الرسمية',
    subtitle:
      'تسجيلات مرئية عالية الدقة للكلمات الافتتاحية وجلسات الحوار الثنائية لمنتدى رؤساء الأعمال الإفريقية الصينية متزامنة تلقائياً من يوتيوب.',
    featuredBadge: 'بث مميز',
    watchNow: 'مشاهدة التسجيل',
    closePlayer: 'إغلاق مشغل الفيديو',
    openYouTube: 'فتح على يوتيوب',
    noVideos: 'لا توجد تسجيلات مرئية منشورة حالياً.',
    recordingDate: 'تاريخ التسجيل',
    categoryLabel: 'القطاع',
    allCategories: 'جميع المرئيات',
    channelSubText: 'القناة الرسمية على يوتيوب',
    visitChannel: 'الاشتراك في القناة',
    autoSyncBadge: 'المزامنة التلقائية نشطة',
  },
  pt: {
    badge: 'Transmissões Oficiais no YouTube e Mídia de Eventos',
    title: 'Galeria de Vídeos da Cúpula e Gravações Oficiais',
    subtitle:
      'Gravações em alta definição de discursos de abertura e entrevistas bilaterais do Fórum de Presidentes de Negócios África–China sincronizadas automaticamente.',
    featuredBadge: 'Transmissão em Destaque',
    watchNow: 'Assistir à Gravação',
    closePlayer: 'Fechar Reprodutor',
    openYouTube: 'Abrir no YouTube',
    noVideos: 'Nenhuma gravação de vídeo publicada no momento.',
    recordingDate: 'Gravado em',
    categoryLabel: 'Corredor Estratégico',
    allCategories: 'Todos os Vídeos',
    channelSubText: 'Canal Oficial no YouTube',
    visitChannel: 'Inscreva-se no YouTube',
    autoSyncBadge: 'Sincronização Ativa',
  },
};

export const EventVideosSection: React.FC<EventVideosSectionProps> = ({ locale, videos }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const t = I18N[locale] || I18N.en;
  const isRtl = locale === 'ar';

  const handleClose = useCallback(() => {
    setActiveVideo(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (activeVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideo, handleClose]);

  // Extract unique categories for filter tabs
  const categories = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) => {
      if (v.category) set.add(v.category);
    });
    return Array.from(set);
  }, [videos]);

  // Filtered videos
  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'ALL') return videos;
    return videos.filter((v) => v.category === selectedCategory);
  }, [videos, selectedCategory]);

  if (!videos || videos.length === 0) {
    return null;
  }

  const featuredVideo = videos.find((v) => v.featured) || videos[0];

  return (
    <section
      id="video-gallery"
      className="py-16 sm:py-20 bg-[#060D1E] text-white border-t border-b border-accbcf-gold/25 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accbcf-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accbcf-blue/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/15 text-accbcf-gold border border-accbcf-gold/35 shadow-sm">
              <VideoIcon className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>{t.autoSyncBadge}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.title}
          </h2>

          <p className="text-white/80 text-xs sm:text-sm sm:leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Official Channel Pill Link */}
          <div className="pt-2 flex justify-center">
            <a
              href="https://www.youtube.com/@africachinachairmenforum?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-xs font-bold text-red-200 hover:text-white transition-all shadow-md hover:scale-105"
            >
              <Youtube className="w-4 h-4 text-red-500 fill-current" />
              <span>{OFFICIAL_YOUTUBE_CHANNEL.handle}</span>
              <span className="text-white/40">•</span>
              <span className="text-accbcf-gold text-[11px] uppercase tracking-wider underline">
                {t.visitChannel}
              </span>
              <ExternalLink className="w-3 h-3 text-white/70" />
            </a>
          </div>
        </div>

        {/* Featured Video Cinema Card */}
        {featuredVideo && (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B172E] via-[#081123] to-[#040A17] border border-accbcf-gold/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              {/* Media Thumbnail Container */}
              <div
                className="lg:col-span-7 relative aspect-video group cursor-pointer overflow-hidden bg-black"
                onClick={() => setActiveVideo(featuredVideo)}
              >
                <img
                  src={
                    featuredVideo.thumbnailUrl ||
                    `https://img.youtube.com/vi/${featuredVideo.youtubeVideoId}/maxresdefault.jpg`
                  }
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const hqUrl = `https://img.youtube.com/vi/${featuredVideo.youtubeVideoId}/hqdefault.jpg`;
                    if (target.src !== hqUrl) {
                      target.src = hqUrl;
                    }
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.featuredBadge}</span>
                  </span>
                </div>

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-accbcf-gold to-[#AA8022] text-[#070E1E] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Text Narrative */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4 flex flex-col justify-center">
                {featuredVideo.eventName && (
                  <div className="text-xs font-bold uppercase tracking-wider text-accbcf-gold">
                    {featuredVideo.eventName}
                  </div>
                )}

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  {featuredVideo.title}
                </h3>

                {featuredVideo.description && (
                  <p className="text-white/75 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featuredVideo.description}
                  </p>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(featuredVideo)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-accbcf-gold via-[#E5C158] to-accbcf-gold text-accbcf-charcoal hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{t.watchNow}</span>
                  </button>

                  <a
                    href={featuredVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-white/80 hover:text-accbcf-gold bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    <span>{t.openYouTube}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filtering Tabs */}
        {categories.length > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap pt-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-accbcf-gold text-accbcf-charcoal shadow-md scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
              }`}
            >
              {t.allCategories} ({videos.length})
            </button>

            {categories.map((cat) => {
              const count = videos.filter((v) => v.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                    selectedCategory === cat
                      ? 'bg-accbcf-gold text-accbcf-charcoal shadow-md scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Video Gallery Grid */}
        <div className="space-y-6 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-[#0C1933] to-[#070E1E] border border-accbcf-gold/20 hover:border-accbcf-gold/60 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] transition-all duration-300 flex flex-col transform hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={
                      video.thumbnailUrl ||
                      `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`
                    }
                    alt={video.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const hqUrl = `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`;
                      if (target.src !== hqUrl) {
                        target.src = hqUrl;
                      }
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-accbcf-gold border border-accbcf-gold/40 backdrop-blur-sm">
                      <Tag className="w-2.5 h-2.5" />
                      <span>{video.category}</span>
                    </span>
                  </div>

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-accbcf-gold/90 text-accbcf-charcoal flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)] transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Date Badge */}
                  {video.eventDate && (
                    <div className="absolute bottom-2.5 right-3 text-[10.5px] font-medium text-white/90 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-accbcf-gold" />
                      <span>{video.eventDate}</span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {video.eventName && (
                      <div className="text-[11px] font-bold uppercase tracking-wider text-accbcf-gold line-clamp-1">
                        {video.eventName}
                      </div>
                    )}
                    <h4 className="font-serif text-base font-bold text-white group-hover:text-accbcf-gold transition-colors line-clamp-2 leading-snug">
                      {video.title}
                    </h4>
                    {video.description && (
                      <p className="text-white/70 text-xs line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                    <span className="inline-flex items-center gap-1 text-accbcf-gold font-semibold group-hover:underline">
                      <span>{t.watchNow}</span>
                      <span>▶</span>
                    </span>
                    <span className="text-[11px] font-mono opacity-60">#{video.displayOrder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Full-Screen Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-5xl bg-[#070E1E] rounded-2xl sm:rounded-3xl border border-accbcf-gold/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#0B172E] to-[#070E1E] border-b border-accbcf-gold/20">
                <div className="flex items-center gap-3 pr-4 overflow-hidden">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {activeVideo.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    title={t.openYouTube}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white/80 hover:text-white transition-colors"
                    title={t.closePlayer}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Video Player Frame */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Video Information Bar */}
              <div className="p-5 bg-gradient-to-t from-[#040A17] to-[#070E1E] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-accbcf-gold">
                      {activeVideo.category}
                    </span>
                    {activeVideo.eventDate && (
                      <>
                        <span className="text-white/30">•</span>
                        <span className="text-xs text-white/60">{activeVideo.eventDate}</span>
                      </>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                    {activeVideo.title}
                  </h4>
                </div>

                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-md transition-all shrink-0"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>{t.openYouTube}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
