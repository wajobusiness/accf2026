'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Check } from 'lucide-react';
import type { Locale } from '@/lib/content';
import { SUPPORTED_LOCALES } from '@/lib/content';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  variant?: 'light' | 'dark';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  className = '',
  variant = 'dark',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const activeLocaleConfig =
    SUPPORTED_LOCALES.find((l) => l.code === currentLocale) || SUPPORTED_LOCALES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSwitch = (targetLocale: Locale) => {
    setIsOpen(false);
    if (targetLocale === currentLocale) return;

    // Set cookie for persistence across sessions & auto-detection override
    if (typeof document !== 'undefined') {
      document.cookie = `accbcf_locale=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }

    // Replace /[locale] prefix in pathname
    let newPath = pathname;
    const supportedPrefixes = SUPPORTED_LOCALES.map((l) => `/${l.code}`);
    const matchedPrefix = supportedPrefixes.find(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );

    if (matchedPrefix) {
      newPath = pathname.replace(matchedPrefix, `/${targetLocale}`);
    } else {
      newPath = `/${targetLocale}${pathname}`;
    }

    router.push(newPath);
  };

  const isDark = variant === 'dark';

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm ${
          isDark
            ? 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-accbcf-gold/50'
            : 'bg-white hover:bg-slate-50 text-accbcf-charcoal border border-slate-200 hover:border-accbcf-blue/40'
        }`}
      >
        <span className="text-sm leading-none" role="img" aria-label={activeLocaleConfig.label}>
          {activeLocaleConfig.flag}
        </span>
        <span className="font-medium tracking-normal">{activeLocaleConfig.nativeName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${isDark ? 'text-accbcf-gold' : 'text-accbcf-blue'}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select Language"
          className={`absolute right-0 mt-2 w-56 rounded-xl p-1.5 z-50 shadow-2xl backdrop-blur-xl border transition-all ${
            isDark
              ? 'bg-[#0B1528]/95 border-accbcf-gold/30 text-white'
              : 'bg-white/98 border-slate-200 text-slate-800'
          }`}
        >
          <div className="px-3 py-1.5 mb-1 border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-accbcf-gold">
            Select Language · 选择语言
          </div>
          <div className="space-y-0.5">
            {SUPPORTED_LOCALES.map((localeItem) => {
              const isSelected = localeItem.code === currentLocale;
              return (
                <button
                  key={localeItem.code}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSwitch(localeItem.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isSelected
                      ? isDark
                        ? 'bg-accbcf-gold/20 text-accbcf-gold font-bold'
                        : 'bg-accbcf-blue/10 text-accbcf-blue font-bold'
                      : isDark
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none" role="img" aria-hidden="true">
                      {localeItem.flag}
                    </span>
                    <div className="text-left">
                      <div className="leading-tight">{localeItem.nativeName}</div>
                      <div
                        className={`text-[10px] ${
                          isDark ? 'text-white/50' : 'text-slate-400'
                        }`}
                      >
                        {localeItem.label}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        isDark ? 'text-accbcf-gold' : 'text-accbcf-blue'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

