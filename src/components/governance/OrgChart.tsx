'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Briefcase,
  Cog,
  Globe2,
  Handshake,
  ClipboardCheck,
  Tv,
  Building2,
  TrendingUp,
  Headset,
  Sprout,
  Pickaxe,
  Zap,
  Factory,
  HeartPulse,
  CircleDollarSign,
  Ship,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
  Download,
  Info,
  Layers,
  Sparkles,
  Compass,
  ArrowDown,
  UserCheck,
} from 'lucide-react';
import { GOVERNANCE_TIERS } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface OrgChartProps {
  locale: Locale;
}

interface DetailModalData {
  title: string;
  category: string;
  level: string;
  description: string;
  badgeColor: string;
  icon: React.ReactNode;
}

export const OrgChart: React.FC<OrgChartProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].governancePage;

  const [activeTab, setActiveTab] = useState<'interactive' | 'archival'>('interactive');
  const [selectedDetail, setSelectedDetail] = useState<DetailModalData | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Retrieve tiers from typed content
  const boardTier = GOVERNANCE_TIERS.find((t) => t.id === 'board');
  const stakeholdersTier = GOVERNANCE_TIERS.find((t) => t.id === 'stakeholders');
  const advisoryTier = GOVERNANCE_TIERS.find((t) => t.id === 'senior-advisory');
  const executiveTier = GOVERNANCE_TIERS.find((t) => t.id === 'executive-management');
  const nationalTier = GOVERNANCE_TIERS.find((t) => t.id === 'national-leadership');
  const secretariatTier = GOVERNANCE_TIERS.find((t) => t.id === 'secretariat-directors');
  const committeesTier = GOVERNANCE_TIERS.find((t) => t.id === 'committees-accbcf');

  // Helper for directorate icons
  const getDirectorateIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Globe2 className="w-8 h-8 text-sky-600" />;
      case 1:
        return <Handshake className="w-8 h-8 text-blue-700" />;
      case 2:
        return <ClipboardCheck className="w-8 h-8 text-indigo-600" />;
      case 3:
        return <Tv className="w-8 h-8 text-cyan-600" />;
      case 4:
        return <Building2 className="w-8 h-8 text-blue-800" />;
      case 5:
        return <TrendingUp className="w-8 h-8 text-emerald-600" />;
      case 6:
        return (
          <div className="relative flex items-center justify-center">
            <Compass className="w-8 h-8 text-red-600" />
            <span className="absolute text-[8px] font-black text-amber-500 font-mono">AF</span>
          </div>
        );
      case 7:
        return <Headset className="w-8 h-8 text-slate-700" />;
      default:
        return <Building2 className="w-8 h-8 text-sky-600" />;
    }
  };

  // Helper for sectoral committee icons
  const getCommitteeIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sprout className="w-8 h-8 text-emerald-600" />;
      case 1:
        return <Pickaxe className="w-8 h-8 text-amber-600" />;
      case 2:
        return <Zap className="w-8 h-8 text-green-500" />;
      case 3:
        return <Factory className="w-8 h-8 text-slate-700" />;
      case 4:
        return <HeartPulse className="w-8 h-8 text-rose-600" />;
      case 5:
        return <CircleDollarSign className="w-8 h-8 text-blue-600" />;
      case 6:
        return <Ship className="w-8 h-8 text-cyan-600" />;
      default:
        return <Layers className="w-8 h-8 text-blue-600" />;
    }
  };

  const getCommitteeBgColor = (index: number) => {
    switch (index) {
      case 0:
        return 'border-emerald-200 bg-emerald-50/40 hover:border-emerald-500';
      case 1:
        return 'border-amber-200 bg-amber-50/40 hover:border-amber-500';
      case 2:
        return 'border-green-200 bg-green-50/40 hover:border-green-500';
      case 3:
        return 'border-slate-200 bg-slate-50/40 hover:border-slate-500';
      case 4:
        return 'border-rose-200 bg-rose-50/40 hover:border-rose-500';
      case 5:
        return 'border-blue-200 bg-blue-50/40 hover:border-blue-500';
      case 6:
        return 'border-cyan-200 bg-cyan-50/40 hover:border-cyan-500';
      default:
        return 'border-blue-200 bg-blue-50/40 hover:border-blue-500';
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* View Switcher Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div className="inline-flex p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200 shadow-inner">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'interactive'
                  ? 'bg-accbcf-blue text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-accbcf-gold" />
              <span>{t.interactiveTab}</span>
            </button>
            <button
              onClick={() => setActiveTab('archival')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'archival'
                  ? 'bg-accbcf-blue text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <Maximize2 className="w-4 h-4 text-accbcf-gold" />
              <span>{t.archivalTab}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-accbcf-blue bg-accbcf-blue/10 hover:bg-accbcf-blue/20 transition-all border border-accbcf-blue/30 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>{t.viewOriginal}</span>
            </button>

            <a
              href="/images/governance/accbcf_org_structure.jpg"
              download="ACCBCF_Organizational_Structure.jpg"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-accbcf-charcoal hover:bg-black transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-accbcf-gold" />
              <span>{t.downloadChart}</span>
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ARCHIVAL VIEW TAB */}
        {/* ========================================================= */}
        {activeTab === 'archival' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-6 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-2">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-widest rounded-full border border-amber-300">
                Official Institutional Chart Archive
              </span>
              <h3 className="text-2xl font-serif font-bold text-accbcf-charcoal">
                Africa China Chairmen of Business Council Forum
              </h3>
              <p className="text-sm text-gray-500">
                Authorized bilateral governance architecture established under the Joint Declaration of the ACCBCF Secretariat.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
              <Image
                src="/images/governance/accbcf_org_structure.jpg"
                alt="ACCBCF Official Organizational Structure Chart"
                width={1200}
                height={1600}
                priority
                className="w-full h-auto object-contain cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              />
              <div
                onClick={() => setLightboxOpen(true)}
                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold text-accbcf-charcoal">
                  <Maximize2 className="w-4 h-4 text-accbcf-gold" />
                  <span>{t.viewOriginal}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* INTERACTIVE DIGITAL STRUCTURE (FAITHFUL REPRODUCTION) */}
        {/* ========================================================= */}
        {activeTab === 'interactive' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden"
          >
            {/* Inner Graphic Canvas */}
            <div className="p-4 sm:p-8 lg:p-12 space-y-12">

              {/* Official Graphic Header matching media_1789120562774.jpg */}
              <div className="relative flex flex-col items-center text-center space-y-4 pt-2">
                {/* Forum Seal on top-right (desktop) / center (mobile) */}
                <div className="sm:absolute sm:right-4 sm:top-0 flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-500 shadow-lg">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                      <Image
                        src="/images/accbcf-emblem.jpg"
                        alt="ACCBCF Official Seal"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-accbcf-charcoal mt-1 tracking-wider">
                    ACCBCF
                  </span>
                </div>

                {/* Main Forum Title in exact 3-tone typography */}
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
                    <span className="text-emerald-700">AFRICA CHINA </span>
                    <span className="text-red-600">CHAIRMEN OF </span>
                    <br className="hidden sm:inline" />
                    <span className="text-red-600">BUSINESS </span>
                    <span className="text-blue-900">COUNCIL FORUM</span>
                  </h2>
                </div>

                {/* Subheader Pill Badge */}
                <div className="inline-block">
                  <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700 text-white font-black text-xs sm:text-base tracking-widest uppercase px-6 sm:px-10 py-2 sm:py-2.5 rounded-full shadow-md border border-cyan-400/40">
                    ACCBCF ORGANIZATIONAL STRUCTURE
                  </div>
                </div>
              </div>

              {/* TIER 1: BOARD OF DIRECTORS */}
              <div className="space-y-6 pt-4">
                {/* Pill Header */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-[#0c3374] via-[#154694] to-[#0c3374] text-white font-bold text-sm sm:text-base uppercase tracking-wider px-8 sm:px-12 py-2.5 rounded-full shadow-lg border border-blue-400/30 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accbcf-gold" />
                    <span>{boardTier?.name[locale] || 'BOARD OF DIRECTORS'}</span>
                  </div>
                </div>

                {/* Branching tree connector */}
                <div className="relative flex justify-center">
                  <div className="w-0.5 h-6 bg-[#0c3374]" />
                </div>
                <div className="relative max-w-4xl mx-auto">
                  {/* Horizontal Bar */}
                  <div className="hidden sm:block h-0.5 bg-[#0c3374] mx-auto w-[65%]" />
                  {/* Vertical drops with arrows */}
                  <div className="hidden sm:flex justify-between w-[65%] mx-auto -mt-0.5">
                    <div className="w-0.5 h-6 bg-[#0c3374]" />
                    <div className="w-0.5 h-6 bg-[#0c3374]" />
                  </div>
                </div>

                {/* Board Leaders Cards (Founder & Co-Founder) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Card 1: CEO & PUBLISHER ACN */}
                  <div className="rounded-2xl border-2 border-[#0c3374] bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
                    <div className="bg-[#0c3374] text-white font-black uppercase text-xs sm:text-sm tracking-wider py-2.5 px-4 text-center">
                      CEO & PUBLISHER ACN
                    </div>
                    <div className="p-6 flex-1 flex flex-col items-center text-center space-y-4">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-accbcf-gold to-amber-200 shadow-md">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                          <Image
                            src="/images/founder/chief_mike_zheng_xiaopeng.jpg"
                            alt="High Chief Mikel Yousuf Ugwu"
                            width={120}
                            height={120}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif font-black text-base sm:text-lg text-[#0c3374] tracking-tight">
                          HIGH CHIEF MIKEL YOUSUF UGWU
                        </h4>
                        <p className="text-xs sm:text-sm font-semibold text-gray-700">
                          (President, Africa-China News Agency)
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                        {locale === 'zh'
                          ? '中非新闻社社长、尼日利亚执政党酋长、非洲首座华人经济特区创始人。'
                          : 'Diplomatic publisher, authorized Special Economic Zone steward, and African sovereign business leader.'}
                      </p>
                      <div className="pt-2 mt-auto">
                        <Link
                          href={`/${locale}/founders#founder-mike`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-accbcf-blue hover:text-accbcf-gold transition-colors"
                        >
                          <span>{t.viewFounderProfile}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: CO - FOUNDER */}
                  <div className="rounded-2xl border-2 border-[#0c3374] bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
                    <div className="bg-[#0c3374] text-white font-black uppercase text-xs sm:text-sm tracking-wider py-2.5 px-4 text-center">
                      CO - FOUNDER
                    </div>
                    <div className="p-6 flex-1 flex flex-col items-center text-center space-y-4">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-accbcf-gold to-amber-200 shadow-md">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                          <Image
                            src="/images/founder/chief_dr_william_towah.jpg"
                            alt="Dr. William Deiyan Towah"
                            width={120}
                            height={120}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif font-black text-base sm:text-lg text-[#0c3374] tracking-tight">
                          DR. WILLIAM DEIYAN TOWAH
                        </h4>
                        <p className="text-xs sm:text-sm font-semibold text-gray-700">
                          (Advisor on West African Community Elections and Strategic Decision-Making)
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                        {locale === 'zh'
                          ? '西共体法院前行政与财政司长、利比里亚前副部长、资深国际公共政策学者。'
                          : 'ECOWAS diplomatic veteran, former ministerial cabinet member, and senior strategic governance scholar.'}
                      </p>
                      <div className="pt-2 mt-auto">
                        <Link
                          href={`/${locale}/founders#founder-william`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-accbcf-blue hover:text-accbcf-gold transition-colors"
                        >
                          <span>{t.viewFounderProfile}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connecting Red Arrow to Tier 2 */}
                <div className="flex justify-center pt-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-red-600" />
                    <ArrowDown className="w-5 h-5 text-red-600 -mt-1.5" />
                  </div>
                </div>
              </div>

              {/* TIER 2: STAKEHOLDERS LEADERSHIP COMMITTEE */}
              <div className="max-w-3xl mx-auto">
                <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-1 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center justify-center gap-2.5 py-2 px-4 text-white">
                    <div className="w-7 h-7 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-xs">
                      <Users className="w-4 h-4" />
                    </div>
                    <h3 className="font-black uppercase tracking-wider text-xs sm:text-base">
                      {stakeholdersTier?.name[locale] || 'STAKEHOLDERS LEADERSHIP COMMITTEE'}
                    </h3>
                  </div>
                  <div className="bg-[#fffbeb] border border-amber-200/80 rounded-xl p-3 text-center">
                    <p className="text-xs sm:text-sm font-semibold text-amber-950">
                      {stakeholdersTier?.mandate?.[locale] ||
                        "Ensuring projects align with Africa's development priorities and social needs."}
                    </p>
                  </div>
                </div>

                {/* Connecting Red Arrow to Tier 3 */}
                <div className="flex justify-center pt-4">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-red-600" />
                    <ArrowDown className="w-5 h-5 text-red-600 -mt-1.5" />
                  </div>
                </div>
              </div>

              {/* TIER 3: SENIOR ADVISORY COMMITTEE */}
              <div className="max-w-3xl mx-auto">
                <div className="rounded-2xl border-2 border-blue-900 bg-gradient-to-r from-[#0d2752] via-[#143d7c] to-[#0d2752] p-1 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center justify-center gap-2.5 py-2 px-4 text-white">
                    <div className="w-7 h-7 rounded-full bg-white text-blue-900 flex items-center justify-center shadow-xs">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-black uppercase tracking-wider text-xs sm:text-base">
                      {advisoryTier?.name[locale] || 'SENIOR ADVISORY COMMITTEE'}
                    </h3>
                  </div>
                  <div className="bg-[#f0f9ff] border border-sky-200 rounded-xl p-3 text-center">
                    <p className="text-xs sm:text-sm font-semibold text-sky-950">
                      {advisoryTier?.subtitle?.[locale] ||
                        '(Strategic Empowerment Level, Policy & Advisory Level)'}
                    </p>
                  </div>
                </div>

                {/* Connecting Red Arrow to Tier 4 */}
                <div className="flex justify-center pt-4">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-red-600" />
                    <ArrowDown className="w-5 h-5 text-red-600 -mt-1.5" />
                  </div>
                </div>
              </div>

              {/* TIER 4: EXECUTIVE MANAGEMENT COMMITTEE */}
              <div className="max-w-3xl mx-auto">
                <div className="rounded-2xl border-2 border-red-800 bg-gradient-to-r from-[#8b1818] via-[#a81d1d] to-[#8b1818] p-1 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center justify-center gap-2.5 py-2 px-4 text-white">
                    <div className="w-7 h-7 rounded-full bg-white text-red-700 flex items-center justify-center shadow-xs">
                      <Cog className="w-4 h-4" />
                    </div>
                    <h3 className="font-black uppercase tracking-wider text-xs sm:text-base">
                      {executiveTier?.name[locale] || 'EXECUTIVE MANAGEMENT COMMITTEE'}
                    </h3>
                  </div>
                  <div className="bg-[#fff1f2] border border-rose-200 rounded-xl p-3 text-center">
                    <p className="text-xs sm:text-sm font-semibold text-rose-950">
                      {executiveTier?.subtitle?.[locale] || '(Operational Management Level)'}
                    </p>
                  </div>
                </div>

                {/* Connecting Arrow to Tier 5 */}
                <div className="flex justify-center pt-4">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-emerald-600" />
                    <ArrowDown className="w-5 h-5 text-emerald-600 -mt-1.5" />
                  </div>
                </div>
              </div>

              {/* TIER 5: NATIONAL LEADERSHIP TIER */}
              <div className="space-y-4 max-w-4xl mx-auto">
                {/* Center: NATIONAL CHAIRMAN */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-2.5 rounded-full shadow-md border border-emerald-400/30 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-xs">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <span>{nationalTier?.items?.[0]?.name[locale] || 'NATIONAL CHAIRMAN'}</span>
                  </div>
                </div>

                {/* Tree lines to Executive Chairman and Vice Chairman */}
                <div className="relative">
                  <div className="hidden sm:block h-0.5 bg-emerald-600 mx-auto w-[65%]" />
                  <div className="hidden sm:flex justify-between w-[65%] mx-auto -mt-0.5">
                    <div className="w-0.5 h-4 bg-emerald-600" />
                    <div className="w-0.5 h-4 bg-emerald-600" />
                  </div>
                </div>

                {/* Left & Right: EXECUTIVE CHAIRMAN & VICE CHAIRMAN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12 max-w-3xl mx-auto">
                  {/* Left */}
                  <div className="flex justify-center sm:justify-end">
                    <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-2 rounded-full shadow-md border border-emerald-400/30 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-xs">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <span>{nationalTier?.items?.[1]?.name[locale] || 'EXECUTIVE CHAIRMAN'}</span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex justify-center sm:justify-start">
                    <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-2 rounded-full shadow-md border border-emerald-400/30 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-xs">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <span>{nationalTier?.items?.[2]?.name[locale] || 'VICE CHAIRMAN'}</span>
                    </div>
                  </div>
                </div>

                {/* Connecting Red Arrow to Secretariat */}
                <div className="flex justify-center pt-3">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-red-600" />
                    <ArrowDown className="w-5 h-5 text-red-600 -mt-1.5" />
                  </div>
                </div>
              </div>

              {/* TIER 6: SECRETARIAT & 8 DIRECTORS OF ACCBCF */}
              <div className="space-y-6 pt-2">
                {/* Secretariat Pill */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-2 rounded-full shadow-md flex items-center gap-2 border border-red-300">
                    <div className="w-6 h-6 rounded-full bg-white text-red-600 flex items-center justify-center shadow-xs">
                      <ClipboardCheck className="w-3.5 h-3.5" />
                    </div>
                    <span>{t.secretariatBadge || 'SECRETARIAT'}</span>
                  </div>
                </div>

                {/* Red Arrow down */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-red-600" />
                    <ArrowDown className="w-4 h-4 text-red-600 -mt-1" />
                  </div>
                </div>

                {/* Directors of ACCBCF Pill */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#991b1b] text-white font-black text-xs sm:text-base uppercase tracking-wider px-8 sm:px-12 py-2.5 rounded-full shadow-md flex items-center gap-2.5 border border-red-400/40">
                    <div className="w-6 h-6 rounded-full bg-white text-red-700 flex items-center justify-center shadow-xs">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <span>{t.directorsBadge || 'DIRECTORS OF ACCBCF'}</span>
                  </div>
                </div>

                {/* Subtitle / Description hint */}
                <div className="text-center max-w-xl mx-auto">
                  <p className="text-xs text-gray-500 font-medium">
                    {t.directorsSubtitle}
                  </p>
                </div>

                {/* Red Horizontal Branch Line for 8 Directorates */}
                <div className="hidden lg:block relative max-w-6xl mx-auto">
                  <div className="h-0.5 bg-red-600 w-[94%] mx-auto" />
                  <div className="flex justify-between w-[94%] mx-auto -mt-0.5">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-red-600" />
                        <ArrowDown className="w-3.5 h-3.5 text-red-600 -mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8 Directorate Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 max-w-7xl mx-auto">
                  {secretariatTier?.items?.map((item, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setSelectedDetail({
                          title: item.name[locale],
                          category: t.secretariatBadge,
                          level: 'Level 06 · Directorate',
                          description: item.description?.[locale] || '',
                          badgeColor: 'bg-red-600',
                          icon: getDirectorateIcon(idx),
                        })
                      }
                      className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-white border-2 border-sky-400 hover:border-blue-600 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer h-full"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-sky-50 group-hover:bg-blue-50 border border-sky-200 flex items-center justify-center p-2 mb-2.5 transition-colors">
                        {getDirectorateIcon(idx)}
                      </div>
                      <h4 className="font-sans font-bold text-[11px] sm:text-xs text-blue-950 uppercase leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors">
                        {item.name[locale]}
                      </h4>
                      <div className="mt-auto pt-2 flex items-center gap-1 text-[10px] text-sky-600 font-semibold opacity-80 group-hover:opacity-100">
                        <Info className="w-3 h-3" />
                        <span>Details</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Red Arrow down to Level 7 */}
                <div className="flex justify-center pt-4">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-red-600" />
                    <ArrowDown className="w-5 h-5 text-red-600 -mt-1.5" />
                  </div>
                </div>
              </div>

              {/* TIER 7: COMMITTEES OF ACCBCF */}
              <div className="space-y-6 pt-2">
                {/* Committee Pill */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-[#0c3374] via-[#1a4a98] to-[#0c3374] text-white font-black text-xs sm:text-base uppercase tracking-wider px-8 sm:px-12 py-2.5 rounded-full shadow-md flex items-center gap-2.5 border border-blue-400/40">
                    <div className="w-6 h-6 rounded-full bg-white text-blue-900 flex items-center justify-center shadow-xs">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <span>{t.committeesBadge || 'COMMITTEE OF ACCBCF'}</span>
                  </div>
                </div>

                {/* Subtitle / Description hint */}
                <div className="text-center max-w-xl mx-auto">
                  <p className="text-xs text-gray-500 font-medium">
                    {t.committeesSubtitle}
                  </p>
                </div>

                {/* Blue Horizontal Branch Line for 7 Committees */}
                <div className="hidden lg:block relative max-w-5xl mx-auto">
                  <div className="h-0.5 bg-[#0c3374] w-[90%] mx-auto" />
                  <div className="flex justify-between w-[90%] mx-auto -mt-0.5">
                    {Array.from({ length: 7 }).map((_, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-[#0c3374]" />
                        <ArrowDown className="w-3.5 h-3.5 text-[#0c3374] -mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7 Sectoral Committees Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 max-w-6xl mx-auto">
                  {committeesTier?.items?.map((item, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setSelectedDetail({
                          title: item.name[locale],
                          category: t.committeesBadge,
                          level: 'Level 07 · Action Committee',
                          description: item.description?.[locale] || '',
                          badgeColor: 'bg-blue-800',
                          icon: getCommitteeIcon(idx),
                        })
                      }
                      className={`group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl border-2 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer h-full ${getCommitteeBgColor(
                        idx
                      )}`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-gray-100 flex items-center justify-center p-2 mb-2.5">
                        {getCommitteeIcon(idx)}
                      </div>
                      <h4 className="font-sans font-bold text-[11px] sm:text-xs text-slate-900 uppercase leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                        {item.name[locale]}
                      </h4>
                      <div className="mt-auto pt-2 flex items-center gap-1 text-[10px] text-gray-500 font-semibold">
                        <Info className="w-3 h-3" />
                        <span>Scope</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Bottom Sovereign Decorative Wave matching media_1789120562774.jpg */}
              <div className="relative pt-12">
                <div className="w-full h-10 sm:h-14 relative overflow-hidden rounded-b-2xl">
                  <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,50 L1200,120 L0,120 Z"
                      fill="#eab308"
                      opacity="0.8"
                    />
                    <path
                      d="M0,20 C200,120 400,-10 600,80 C800,170 1000,30 1200,70 L1200,120 L0,120 Z"
                      fill="#0c3374"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>

      {/* ========================================================= */}
      {/* DETAIL MODAL (FOR DIRECTORATES & COMMITTEES) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDetail(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center p-3 shadow-xs">
                  {selectedDetail.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-accbcf-blue/10 text-accbcf-blue">
                    {selectedDetail.level}
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-accbcf-charcoal">
                    {selectedDetail.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h5 className="text-xs font-bold uppercase tracking-wider text-accbcf-gray">
                  {t.mandateLabel || 'Institutional Mandate'}
                </h5>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {selectedDetail.description}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <Link
                  href={`/${locale}/contact`}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-accbcf-blue text-white hover:bg-accbcf-blue-deep transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Connect With Desk</span>
                  <ExternalLink className="w-3.5 h-3.5 text-accbcf-gold" />
                </Link>
                <button
                  onClick={() => setSelectedDetail(null)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {t.closeModal || 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* LIGHTBOX MODAL (OFFICIAL CHART DOCUMENT INSPECTION) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
            {/* Header controls */}
            <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400">
                  <Image
                    src="/images/accbcf-emblem.jpg"
                    alt="ACCBCF Seal"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base">
                    Official ACCBCF Organizational Structure
                  </h4>
                  <p className="text-[11px] text-gray-300">
                    Sovereign Governance Chart · Abuja Headquarters
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  -
                </button>
                <span className="text-xs font-mono text-gray-300 px-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  Reset
                </button>

                <a
                  href="/images/governance/accbcf_org_structure.jpg"
                  download="ACCBCF_Organizational_Structure.jpg"
                  className="p-2 rounded-lg bg-accbcf-gold text-accbcf-charcoal hover:bg-amber-400 transition-colors ml-2"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    setLightboxOpen(false);
                    setZoomLevel(1);
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable image viewport */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-4">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="max-w-4xl w-full"
              >
                <Image
                  src="/images/governance/accbcf_org_structure.jpg"
                  alt="ACCBCF Organizational Structure Chart"
                  width={1200}
                  height={1600}
                  className="w-full h-auto object-contain rounded-xl shadow-2xl mx-auto"
                />
              </motion.div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-400 py-2">
              Africa China Chairmen of Business Council Forum · Registered Sovereign Bilateral Institution
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

