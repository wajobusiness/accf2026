'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import type { Locale } from '@/lib/content';

interface WelcomeVideoModalProps {
  locale: Locale;
}

interface ModalI18n {
  badge: string;
  title: string;
  subtitle: string;
  enterButton: string;
  closeAria: string;
  authorityBadge: string;
  reWatchText: string;
  reWatchTooltip: string;
}

const MODAL_I18N: Record<Locale, ModalI18n> = {
  en: {
    badge: 'Official Video Presentation',
    title: 'Welcome to ACCBCF 2026',
    subtitle: 'Africa China Chairmen of Business Forum · Abuja Headquarters',
    enterButton: 'Enter ACCBCF Portal',
    closeAria: 'Close Welcome Video',
    authorityBadge: 'Federal Ministry of Industry, Trade & Investment',
    reWatchText: 'Watch Welcome Video',
    reWatchTooltip: 'Click to replay the ACCBCF inaugural welcome presentation',
  },
  zh: {
    badge: '官方推介视频',
    title: '欢迎莅临非洲中国会长论坛',
    subtitle: '非洲中国会长论坛 · 尼日利亚阿布贾全球总部',
    enterButton: '进入论坛官方门户',
    closeAria: '关闭推介视频',
    authorityBadge: '尼日利亚联邦工业、贸易与投资部',
    reWatchText: '观看官方推介视频',
    reWatchTooltip: '点击重新播放非洲中国会长论坛官方推介视频',
  },
  fr: {
    badge: 'Présentation Vidéo Officielle',
    title: 'Bienvenue à l’ACCBCF 2026',
    subtitle: 'Forum des Présidents d’Entreprises Afrique-Chine · Siège d’Abuja',
    enterButton: 'Accéder au Portail ACCBCF',
    closeAria: 'Fermer la vidéo de bienvenue',
    authorityBadge: 'Ministère Fédéral de l’Industrie, du Commerce et de l’Investissement',
    reWatchText: 'Voir la vidéo de bienvenue',
    reWatchTooltip: 'Cliquez pour revoir la présentation vidéo officielle de l’ACCBCF',
  },
  ar: {
    badge: 'العرض المرئي الرسمي',
    title: 'مرحباً بكم في منتدى ACCBCF 2026',
    subtitle: 'منتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية · المقر الرئيسي في أبوجا',
    enterButton: 'الدخول إلى بوابة المنتدى',
    closeAria: 'إغلاق فيديو الترحيب',
    authorityBadge: 'وزارة التجارة والصناعة والاستثمار الاتحادية',
    reWatchText: 'مشاهدة فيديو الترحيب',
    reWatchTooltip: 'انقر لإعادة تشغيل العرض الترحيبي الرسمي لمنتدى ACCBCF',
  },
  pt: {
    badge: 'Apresentação Oficial em Vídeo',
    title: 'Bem-vindo ao ACCBCF 2026',
    subtitle: 'Fórum de Presidentes de Negócios África–China · Sede de Abuja',
    enterButton: 'Entrar no Portal ACCBCF',
    closeAria: 'Fechar vídeo de boas-vindas',
    authorityBadge: 'Ministério Federal da Indústria, Comércio e Investimento',
    reWatchText: 'Assistir ao vídeo de boas-vindas',
    reWatchTooltip: 'Clique para rever a apresentação oficial do ACCBCF',
  },
};

const YOUTUBE_VIDEO_ID = 'YGiA9rLG2yw';
const STORAGE_KEY = 'accbcf_welcome_video_viewed';

export const WelcomeVideoModal: React.FC<WelcomeVideoModalProps> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const t = MODAL_I18N[locale] || MODAL_I18N.en;
  const isRtl = locale === 'ar';

  // Check sessionStorage on initial load
  useEffect(() => {
    try {
      const alreadyViewed = sessionStorage.getItem(STORAGE_KEY);
      if (!alreadyViewed) {
        // Subtle entrance delay for better UX and smooth page initialization
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 750);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case sessionStorage is restricted (e.g. incognito strict mode)
    } finally {
      setHasCheckedStorage(true);
    }
  }, []);

  // Listen for global custom event to trigger reopening from any section
  useEffect(() => {
    const handleReopen = () => setIsOpen(true);
    window.addEventListener('accbcf:open-welcome-video', handleReopen);
    return () => window.removeEventListener('accbcf:open-welcome-video', handleReopen);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close handler with session persistence
  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore if private browsing blocks storage
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  return (
    <>
      {/* Discreet floating re-watch button for users who closed it */}
      {hasCheckedStorage && !isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-6 z-40 hidden sm:block ${
            isRtl ? 'right-6' : 'left-6'
          }`}
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            title={t.reWatchTooltip}
            className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#001D3D]/95 hover:bg-[#002D5A] border border-accbcf-gold/50 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md text-accbcf-gold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accbcf-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accbcf-gold"></span>
            </span>
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-semibold tracking-wide text-white group-hover:text-accbcf-gold transition-colors">
              {t.reWatchText}
            </span>
          </button>
        </motion.div>
      )}

      {/* Pop-up Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-video-heading"
          >
            {/* Backdrop: clicking outside triggers light-dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 bg-[#060D1D]/85 backdrop-blur-md cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#081224] border border-accbcf-gold/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(240,180,40,0.18)] overflow-hidden flex flex-col z-10 my-auto"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Top Accent Gold Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-accbcf-gold via-amber-200 to-accbcf-gold" />

              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#001D3D]/90 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-accbcf-gold/60 shadow-md shrink-0 bg-white">
                    <Image
                      src="/images/accbcf-emblem.jpg"
                      alt="ACCBCF Official Seal"
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accbcf-gold bg-accbcf-gold/15 px-2 py-0.5 rounded-full border border-accbcf-gold/30">
                        <Sparkles className="w-2.5 h-2.5" />
                        {t.badge}
                      </span>
                    </div>
                    <h2
                      id="welcome-video-heading"
                      className="text-sm sm:text-base font-bold text-white tracking-tight"
                    >
                      {t.title}
                    </h2>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label={t.closeAria}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-accbcf-gold text-white hover:text-[#060D1D] flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accbcf-gold active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Responsive 16:9 Video Player Container */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={t.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Bottom Diplomatic Action Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#001830] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-white/70 text-center sm:text-left">
                  <ShieldCheck className="w-4 h-4 text-accbcf-gold shrink-0" />
                  <span className="line-clamp-1">{t.authorityBadge}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-accbcf-gold via-amber-400 to-accbcf-gold-dark text-[#060D1D] font-bold text-xs sm:text-sm tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{t.enterButton}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WelcomeVideoModal;

