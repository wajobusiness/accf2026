'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Camera,
  Tag,
  Info,
  Layers,
} from 'lucide-react';
import type { Locale } from '@/lib/content';

export interface LightboxImage {
  image: string;
  alt?: string;
  title?: string;
  caption?: string;
  description?: string;
  tag?: string;
  category?: string;
  date?: string;
  location?: string;
}

export interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  initialIndex?: number;
  locale?: Locale;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  locale = 'en',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const isZh = locale === 'zh';

  // Sync initialIndex when modal opens or initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0);
    }
  }, [isOpen, initialIndex, images.length]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) {
      handleNext();
    } else if (diffX < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white select-none"
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title || currentItem.caption || 'Image Preview'}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 1. TOP CONTROLS BAR */}
          <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-white/10">
            {/* Left: Tag / Category Badge & Title */}
            <div className="flex items-center gap-3 overflow-hidden pr-2">
              {currentItem.tag && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal shadow-sm flex-shrink-0">
                  <Tag className="w-3 h-3" />
                  <span>{currentItem.tag}</span>
                </span>
              )}
              {currentItem.category && !currentItem.tag && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-blue text-white shadow-sm flex-shrink-0">
                  <Tag className="w-3 h-3 text-accbcf-gold" />
                  <span>{currentItem.category}</span>
                </span>
              )}
              <div className="truncate">
                <span className="font-serif font-bold text-sm sm:text-base text-white truncate block">
                  {currentItem.title || currentItem.caption || (isZh ? '官方画廊预览' : 'Official Photo Archive')}
                </span>
              </div>
            </div>

            {/* Right: Counter, Info Toggle & Close Button */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Slide Counter */}
              {images.length > 1 && (
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-accbcf-gold">
                  {currentIndex + 1} <span className="text-white/40">/</span> {images.length}
                </span>
              )}

              {/* Info Toggle */}
              {(currentItem.description || currentItem.caption) && (
                <button
                  type="button"
                  onClick={() => setShowInfo((prev) => !prev)}
                  className={`p-2 rounded-full border transition-colors ${
                    showInfo
                      ? 'bg-accbcf-gold text-accbcf-charcoal border-accbcf-gold'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                  }`}
                  title={showInfo ? (isZh ? '隐藏详情' : 'Hide details') : (isZh ? '显示详情' : 'Show details')}
                  aria-label="Toggle Image Details"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-white hover:text-white border border-white/20 transition-all focus:outline-none hover:scale-105"
                title={isZh ? '关闭 (Esc)' : 'Close (Esc)'}
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2. MAIN IMAGE VIEWPORT */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            {/* Backdrop click to close */}
            <div
              onClick={onClose}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-hidden="true"
            />

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-6 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-accbcf-gold hover:text-accbcf-charcoal text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-2xl focus:outline-none"
                aria-label={isZh ? '上一张' : 'Previous Image'}
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* Active Image Container */}
            <div className="relative z-20 max-w-6xl max-h-[75vh] sm:max-h-[80vh] w-full h-full flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative w-full h-full flex items-center justify-center pointer-events-auto"
                >
                  <Image
                    src={currentItem.image}
                    alt={currentItem.alt || currentItem.title || currentItem.caption || 'ACCBCF Photo'}
                    fill
                    priority
                    className="object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-6 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-accbcf-gold hover:text-accbcf-charcoal text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-2xl focus:outline-none"
                aria-label={isZh ? '下一张' : 'Next Image'}
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}
          </div>

          {/* 3. BOTTOM CAPTION & THUMBNAILS DRAWER */}
          <div className="relative z-30 bg-gradient-to-t from-black/95 via-black/85 to-transparent border-t border-white/10 px-4 sm:px-8 py-3 sm:py-4 space-y-3">
            {/* Caption & Description Box */}
            {showInfo && (currentItem.caption || currentItem.description || currentItem.title) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="max-w-4xl mx-auto text-center space-y-1"
              >
                {currentItem.title && (
                  <h4 className="font-serif font-bold text-base sm:text-lg text-accbcf-gold">
                    {currentItem.title}
                  </h4>
                )}
                {currentItem.caption && currentItem.caption !== currentItem.title && (
                  <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed">
                    {currentItem.caption}
                  </p>
                )}
                {currentItem.description && (
                  <p className="text-xs sm:text-sm text-white/75 max-w-3xl mx-auto leading-relaxed">
                    {currentItem.description}
                  </p>
                )}
              </motion.div>
            )}

            {/* Thumbnail Strip for fast navigation */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 max-w-full no-scrollbar">
                {images.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative flex-shrink-0 w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                        isActive
                          ? 'border-accbcf-gold scale-105 shadow-[0_0_15px_rgba(240,180,40,0.6)] ring-1 ring-white/50'
                          : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/60'
                      }`}
                      aria-label={`Go to photo ${idx + 1}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt || `Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

