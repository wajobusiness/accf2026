'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, Maximize2 } from 'lucide-react';
import type { Locale } from '@/lib/content';
import { ImageLightboxModal, type LightboxImage } from './ImageLightboxModal';

interface ClickableImagePreviewProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  description?: string;
  tag?: string;
  category?: string;
  locale?: Locale;
  className?: string;
  imageClassName?: string;
  aspectRatioClassName?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  showOverlayHint?: boolean;
  overlayText?: string;
  children?: React.ReactNode;
}

export const ClickableImagePreview: React.FC<ClickableImagePreviewProps> = ({
  src,
  alt,
  title,
  caption,
  description,
  tag,
  category,
  locale = 'en',
  className = '',
  imageClassName = 'object-cover',
  aspectRatioClassName = 'relative w-full h-full',
  priority = false,
  fill = true,
  width,
  height,
  showOverlayHint = true,
  overlayText,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isZh = locale === 'zh';

  const lightboxImages: LightboxImage[] = [
    {
      image: src,
      alt,
      title: title || alt,
      caption: caption || title || alt,
      description,
      tag,
      category,
    },
  ];

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`group relative overflow-hidden cursor-pointer ${className}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        aria-label={overlayText || (isZh ? '点击查看大图预览' : 'Click to preview image in full resolution')}
      >
        <div className={aspectRatioClassName}>
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className={`${imageClassName} transition-transform duration-500 group-hover:scale-105`}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width || 800}
              height={height || 600}
              priority={priority}
              className={`${imageClassName} transition-transform duration-500 group-hover:scale-105`}
            />
          )}

          {/* Children nodes (e.g. badges, gradient overlays) */}
          {children}

          {/* Hover zoom indicator overlay */}
          {showOverlayHint && (
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
              <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 text-xs font-bold text-accbcf-charcoal transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <ZoomIn className="w-3.5 h-3.5 text-accbcf-gold-dark" />
                <span>{overlayText || (isZh ? '查看大图' : 'Preview Image')}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <ImageLightboxModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={lightboxImages}
        initialIndex={0}
        locale={locale}
      />
    </>
  );
};

