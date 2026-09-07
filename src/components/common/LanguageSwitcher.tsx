'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: 'en' | 'zh';
  className?: string;
  variant?: 'light' | 'dark';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  className = '',
  variant = 'dark',
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = (targetLocale: 'en' | 'zh') => {
    if (targetLocale === currentLocale) return;

    // Replace /[locale] prefix in pathname
    let newPath = pathname;
    if (pathname.startsWith('/en')) {
      newPath = pathname.replace('/en', `/${targetLocale}`);
    } else if (pathname.startsWith('/zh')) {
      newPath = pathname.replace('/zh', `/${targetLocale}`);
    } else {
      newPath = `/${targetLocale}${pathname}`;
    }

    router.push(newPath);
  };

  const isDark = variant === 'dark';

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-full text-xs font-semibold tracking-wide transition-colors ${
        isDark
          ? 'bg-white/10 text-white border border-white/20'
          : 'bg-accbcf-light text-accbcf-charcoal border border-accbcf-gray-light'
      } ${className}`}
      role="group"
      aria-label="Language Switcher"
    >
      <Globe className={`w-3.5 h-3.5 ml-1.5 ${isDark ? 'text-accbcf-gold' : 'text-accbcf-blue'}`} />
      <button
        type="button"
        onClick={() => handleSwitch('en')}
        className={`px-2.5 py-1 rounded-full transition-all ${
          currentLocale === 'en'
            ? isDark
              ? 'bg-accbcf-gold text-accbcf-charcoal font-bold shadow-sm'
              : 'bg-accbcf-blue text-white font-bold shadow-sm'
            : isDark
            ? 'text-white/80 hover:text-white'
            : 'text-accbcf-gray hover:text-accbcf-charcoal'
        }`}
        aria-pressed={currentLocale === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleSwitch('zh')}
        className={`px-2.5 py-1 rounded-full transition-all ${
          currentLocale === 'zh'
            ? isDark
              ? 'bg-accbcf-gold text-accbcf-charcoal font-bold shadow-sm'
              : 'bg-accbcf-blue text-white font-bold shadow-sm'
            : isDark
            ? 'text-white/80 hover:text-white'
            : 'text-accbcf-gray hover:text-accbcf-charcoal'
        }`}
        aria-pressed={currentLocale === 'zh'}
      >
        中文
      </button>
    </div>
  );
};
