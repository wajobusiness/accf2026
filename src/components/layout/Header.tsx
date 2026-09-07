'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = UI_STRINGS[locale].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/governance`, label: t.governance },
    { href: `/${locale}/programs`, label: t.programs },
    { href: `/${locale}/sectors`, label: t.sectors },
    { href: `/${locale}/news`, label: t.news },
    { href: `/${locale}/events`, label: t.events },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  const isCurrent = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-accbcf-blue/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
            : 'bg-gradient-to-b from-accbcf-blue-deep/90 via-accbcf-blue/80 to-transparent backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Wordmark */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="ACCBCF Home"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-md ring-2 ring-accbcf-gold/60 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/images/accbcf-emblem.jpg"
                  alt="ACCBCF Official Emblem"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-wider">
                    ACCBCF
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40 rounded">
                    Abuja HQ
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-white/80 tracking-tight leading-tight line-clamp-1">
                  {locale === 'zh'
                    ? '非中企业领袖论坛 · 官方平台'
                    : 'Africa China Chairmen of Business Forum'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isCurrent(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-3 py-1.5 text-[13px] lg:text-sm font-medium transition-colors text-white/90 hover:text-white group"
                  >
                    <span>{link.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-accbcf-gold rounded-full shadow-[0_0_8px_rgba(240,180,40,0.8)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Language Switcher & Diplomatic CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher currentLocale={locale} variant="dark" />
              <Link
                href={`/${locale}/contact`}
                className="sheen-sweep inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal hover:bg-accbcf-gold-light hover:shadow-md transition-all duration-200"
              >
                <span>{t.partnerCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher currentLocale={locale} variant="dark" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accbcf-gold"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-accbcf-blue-deep/98 border-b border-accbcf-gold/30 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1"
            >
              {navLinks.map((link) => {
                const active = isCurrent(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-white/15 text-accbcf-gold font-bold pl-4 border-l-4 border-accbcf-gold'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/10 mt-3 flex flex-col gap-2.5">
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal shadow-md"
                >
                  <span>{t.partnerCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-[11px] text-white/70 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-accbcf-gold" />
                  <span>HQ: Federal Ministry of Industry, Trade & Investment, Abuja</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
