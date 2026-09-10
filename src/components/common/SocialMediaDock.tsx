'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { SOCIAL_LINKS, Locale } from '@/lib/content';
import { SocialPlatformIcon } from './SocialIcons';

interface SocialMediaDockProps {
  locale: Locale;
}

export const SocialMediaDock: React.FC<SocialMediaDockProps> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = locale === 'ar';

  const label = locale === 'zh' ? '关注论坛' : 'Follow Us';

  return (
    <div
      className={`fixed z-40 top-1/2 -translate-y-1/2 ${
        isRtl ? 'left-3 sm:left-4' : 'right-3 sm:right-4'
      }`}
      aria-label="Official Social Media Links"
    >
      {/* Desktop Vertical Strip */}
      <div className="hidden sm:flex flex-col items-center bg-[#001D3D]/95 backdrop-blur-md border border-accbcf-gold/30 rounded-2xl p-2 shadow-2xl space-y-2">
        <span className="text-[9px] font-bold uppercase tracking-widest text-accbcf-gold [writing-mode:vertical-lr] rotate-180 py-1 select-none">
          {label}
        </span>
        <div className="w-4 h-px bg-white/20" />
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name} (${item.handle})`}
            aria-label={item.ariaLabel}
            className="group relative w-8 h-8 rounded-xl bg-white/5 hover:bg-accbcf-gold text-white hover:text-accbcf-charcoal border border-white/10 hover:border-accbcf-gold flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <SocialPlatformIcon id={item.id} className="w-3.5 h-3.5" />
            <span
              className={`pointer-events-none absolute whitespace-nowrap rounded-lg bg-[#00142A] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-2xl ring-1 ring-white/15 transition-opacity duration-200 group-hover:opacity-100 z-50 ${
                isRtl ? 'left-full ml-3' : 'right-full mr-3'
              }`}
            >
              <span className="text-accbcf-gold font-bold">{item.name}</span>{' '}
              <span className="text-white/80 font-mono text-[11px]">{item.handle}</span>
            </span>
          </a>
        ))}
      </div>

      {/* Mobile Floating Trigger & Flyout */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Social Accounts"
          className="w-10 h-10 rounded-full bg-accbcf-blue-deep border border-accbcf-gold/50 shadow-xl text-accbcf-gold flex items-center justify-center focus:outline-none"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-12 ${
                isRtl ? 'left-0' : 'right-0'
              } bg-[#001D3D] border border-accbcf-gold/40 rounded-2xl p-3 shadow-2xl space-y-2 w-48`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-accbcf-gold border-b border-white/10 pb-1.5 px-1">
                {locale === 'zh' ? '官方社交媒体' : 'Official Channels'}
              </div>
              <div className="space-y-1.5">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-accbcf-gold">
                      <SocialPlatformIcon id={item.id} className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium truncate">{item.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
