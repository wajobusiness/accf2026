'use client';

import React from 'react';
import { SOCIAL_LINKS, SocialLinkItem } from '@/lib/content';

interface IconProps {
  className?: string;
}

export const XIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const LinkedinIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
  </svg>
);

export const TiktokIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.43c.02 1.95-.56 3.91-1.76 5.43-1.42 1.8-3.66 2.87-5.93 2.89-2.31.02-4.6-.96-6.1-2.72-1.61-1.87-2.18-4.51-1.48-6.9 1-3.41 4.54-5.59 8.01-4.87v4.06c-1.39-.47-3.02-.13-4.04.88-.95.93-1.28 2.37-.84 3.65.41 1.23 1.59 2.08 2.89 2.12 1.34.04 2.64-.72 3.19-1.94.34-.73.43-1.57.43-2.38V.02z" />
  </svg>
);

export const SocialPlatformIcon: React.FC<{ id: SocialLinkItem['id']; className?: string }> = ({
  id,
  className = 'w-4 h-4',
}) => {
  switch (id) {
    case 'x':
      return <XIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
    case 'linkedin':
      return <LinkedinIcon className={className} />;
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'tiktok':
      return <TiktokIcon className={className} />;
    default:
      return null;
  }
};

interface SocialIconsGroupProps {
  variant?: 'footer' | 'header' | 'floating' | 'contact' | 'compact';
  className?: string;
  showLabels?: boolean;
}

export const SocialIconsGroup: React.FC<SocialIconsGroupProps> = ({
  variant = 'footer',
  className = '',
  showLabels = false,
}) => {
  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name} (${item.handle})`}
            aria-label={item.ariaLabel}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-accbcf-gold hover:bg-white/10 transition-all duration-200"
          >
            <SocialPlatformIcon id={item.id} className="w-3.5 h-3.5" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name}: ${item.handle}`}
            aria-label={item.ariaLabel}
            className="group relative flex items-center"
          >
            <div className="w-10 h-10 rounded-full bg-[#001D3D] hover:bg-accbcf-blue text-white hover:text-accbcf-gold border border-accbcf-gold/40 shadow-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110">
              <SocialPlatformIcon id={item.id} className="w-4 h-4" />
            </div>
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-[#001D3D] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-xl ring-1 ring-white/10 transition-opacity duration-200 group-hover:opacity-100">
              <span className="text-accbcf-gold font-bold">{item.name}</span>{' '}
              <span className="text-white/70 text-[11px]">{item.handle}</span>
            </span>
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-accbcf-gold/60 text-white transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-accbcf-gold group-hover:scale-110 group-hover:text-white transition-all">
              <SocialPlatformIcon id={item.id} className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white group-hover:text-accbcf-gold transition-colors">
                {item.name}
              </div>
              <div className="text-[11px] text-white/70 truncate font-mono">
                {item.handle}
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name} (${item.handle})`}
            aria-label={item.ariaLabel}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-accbcf-gold text-white/70 hover:text-accbcf-charcoal flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <SocialPlatformIcon id={item.id} className="w-3 h-3" />
          </a>
        ))}
      </div>
    );
  }

  // Default 'footer' variant
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.name}: ${item.handle}`}
          aria-label={item.ariaLabel}
          className="group relative w-9 h-9 rounded-xl bg-white/10 hover:bg-accbcf-gold text-white hover:text-accbcf-charcoal border border-white/15 hover:border-accbcf-gold flex items-center justify-center shadow-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          <SocialPlatformIcon id={item.id} className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#001026] px-2 py-1 text-[11px] font-semibold text-accbcf-gold opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-200 group-hover:opacity-100 z-30">
            {item.handle}
          </span>
        </a>
      ))}
    </div>
  );
};
