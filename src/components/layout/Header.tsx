'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Landmark,
  Users,
  Layers,
  Briefcase,
  Globe,
  FileText,
  Calendar,
} from 'lucide-react';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface HeaderProps {
  locale: Locale;
}

interface DropdownItem {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavLinkItem {
  type: 'link';
  href: string;
  label: string;
}

interface NavDropdownGroup {
  type: 'dropdown';
  id: string;
  label: string;
  items: DropdownItem[];
}

type NavItem = NavLinkItem | NavDropdownGroup;

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const t = UI_STRINGS[locale].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: NavItem[] = [
    {
      type: 'link',
      href: `/${locale}`,
      label: t.home,
    },
    {
      type: 'dropdown',
      id: 'about',
      label: t.menuAbout,
      items: [
        {
          href: `/${locale}/about`,
          label: t.aboutOverview,
          description: t.aboutOverviewDesc,
          icon: Landmark,
        },
        {
          href: `/${locale}/governance`,
          label: t.aboutGovernance,
          description: t.aboutGovernanceDesc,
          icon: Users,
        },
        {
          href: `/${locale}#strategic-positioning`,
          label: t.aboutModels,
          description: t.aboutModelsDesc,
          icon: Layers,
        },
      ],
    },
    {
      type: 'dropdown',
      id: 'cooperation',
      label: t.menuCooperation,
      items: [
        {
          href: `/${locale}/programs`,
          label: t.cooperationPrograms,
          description: t.cooperationProgramsDesc,
          icon: Briefcase,
        },
        {
          href: `/${locale}/sectors`,
          label: t.cooperationSectors,
          description: t.cooperationSectorsDesc,
          icon: Globe,
        },
      ],
    },
    {
      type: 'dropdown',
      id: 'media',
      label: t.menuMedia,
      items: [
        {
          href: `/${locale}/news`,
          label: t.mediaNews,
          description: t.mediaNewsDesc,
          icon: FileText,
        },
        {
          href: `/${locale}/events`,
          label: t.mediaEvents,
          description: t.mediaEventsDesc,
          icon: Calendar,
        },
      ],
    },
    {
      type: 'link',
      href: `/${locale}/contact`,
      label: t.contact,
    },
  ];

  const isLinkActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    const clean = href.split('#')[0];
    return pathname.startsWith(clean);
  };

  const isGroupActive = (items: DropdownItem[]) => {
    return items.some((item) => {
      const clean = item.href.split('#')[0];
      if (clean === `/${locale}`) return false;
      return pathname.startsWith(clean);
    });
  };

  const handleDropdownEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close menus on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-accbcf-blue/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
            : 'bg-gradient-to-b from-accbcf-blue-deep/95 via-accbcf-blue/85 to-transparent backdrop-blur-sm py-4'
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
              <span className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wider group-hover:text-accbcf-gold transition-colors">
                ACCBCF
              </span>
            </Link>

            {/* Desktop Navigation with Dropdowns */}
            <nav
              ref={navContainerRef}
              className="hidden lg:flex items-center space-x-1"
              aria-label="Main Navigation"
            >
              {navigation.map((item) => {
                if (item.type === 'link') {
                  const active = isLinkActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative px-3.5 py-2 text-[13px] xl:text-sm font-medium transition-colors rounded-lg ${
                        active
                          ? 'text-white font-semibold'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-accbcf-gold rounded-full shadow-[0_0_8px_rgba(240,180,40,0.8)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                }

                const isCurrentGroup = isGroupActive(item.items);
                const isOpen = activeDropdown === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.id)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : item.id)}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 text-[13px] xl:text-sm font-medium transition-colors rounded-lg focus:outline-none ${
                        isOpen || isCurrentGroup
                          ? 'text-white bg-white/10'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-accbcf-gold' : 'text-white/70'
                        }`}
                      />
                      {isCurrentGroup && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-accbcf-gold rounded-full shadow-[0_0_8px_rgba(240,180,40,0.8)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 rounded-2xl bg-accbcf-blue-deep/98 backdrop-blur-xl border border-white/15 border-t-2 border-t-accbcf-gold shadow-2xl p-2 z-50 ring-1 ring-black/30"
                        >
                          <div className="space-y-1">
                            {item.items.map((sub) => {
                              const SubIcon = sub.icon;
                              const isSubActive = isLinkActive(sub.href);
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className={`group flex items-start gap-3.5 p-3 rounded-xl transition-all ${
                                    isSubActive
                                      ? 'bg-white/15 text-white ring-1 ring-accbcf-gold/40'
                                      : 'hover:bg-white/10 text-white/90 hover:text-white'
                                  }`}
                                >
                                  <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                                      isSubActive
                                        ? 'bg-accbcf-gold text-accbcf-charcoal shadow-sm'
                                        : 'bg-white/10 text-accbcf-gold group-hover:bg-accbcf-gold group-hover:text-accbcf-charcoal'
                                    }`}
                                  >
                                    <SubIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between text-sm font-semibold tracking-tight text-white group-hover:text-accbcf-gold transition-colors">
                                      <span>{sub.label}</span>
                                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accbcf-gold" />
                                    </div>
                                    <p className="text-xs text-white/70 leading-snug mt-0.5 line-clamp-2">
                                      {sub.description}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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

        {/* Mobile Navigation Drawer with Accordion Groups */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-accbcf-blue-deep/98 border-b border-accbcf-gold/30 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 max-h-[85vh] overflow-y-auto"
            >
              {navigation.map((item) => {
                if (item.type === 'link') {
                  const active = isLinkActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? 'bg-white/15 text-accbcf-gold font-bold pl-4 border-l-4 border-accbcf-gold'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isGroupOpen = mobileExpandedGroup === item.id;
                const isCurrentGroup = isGroupActive(item.items);

                return (
                  <div
                    key={item.id}
                    className="rounded-lg overflow-hidden border border-white/10 bg-white/[0.03]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpandedGroup(isGroupOpen ? null : item.id)
                      }
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                        isCurrentGroup
                          ? 'text-accbcf-gold bg-white/10'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.label}</span>
                        {isCurrentGroup && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accbcf-gold" />
                        )}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isGroupOpen ? 'rotate-180 text-accbcf-gold' : 'text-white/60'
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isGroupOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="bg-black/25 px-2.5 py-2 space-y-1.5 border-t border-white/10"
                        >
                          {item.items.map((sub) => {
                            const SubIcon = sub.icon;
                            const isSubActive = isLinkActive(sub.href);
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                  isSubActive
                                    ? 'bg-accbcf-gold/20 text-accbcf-gold font-bold'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <SubIcon className="w-4 h-4 text-accbcf-gold flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <span className="block font-semibold">
                                    {sub.label}
                                  </span>
                                  <span className="block text-[11px] text-white/65 line-clamp-1 mt-0.5">
                                    {sub.description}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-4 border-t border-white/10 mt-3 flex flex-col gap-2.5">
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal shadow-md hover:bg-accbcf-gold-light transition-colors"
                >
                  <span>{t.partnerCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-[11px] text-white/70 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-accbcf-gold flex-shrink-0" />
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
