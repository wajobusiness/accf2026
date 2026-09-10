'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  ExternalLink,
  ShieldCheck,
  CheckCheck,
  Clock,
} from 'lucide-react';
import { Locale } from '@/lib/content';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12.031 0C5.395 0 0 5.394 0 12.031c0 2.118.553 4.187 1.604 6.009L.065 24l6.155-1.614a11.97 11.97 0 0 0 5.811 1.498h.005c6.634 0 12.029-5.395 12.029-12.032C24.065 5.394 18.669 0 12.031 0zm0 22.034h-.004a9.98 9.98 0 0 1-5.086-1.391l-.365-.217-3.778.991 1.008-3.684-.237-.378a9.96 9.96 0 0 1-1.528-5.324c0-5.522 4.492-10.015 10.019-10.015 2.675 0 5.19 1.042 7.081 2.934a9.95 9.95 0 0 1 2.93 7.085c0 5.523-4.492 10.015-10.02 10.015zm5.485-7.502c-.301-.15-1.782-.879-2.058-.979-.276-.1-.476-.15-.677.15-.2.3-.777.979-.953 1.18-.175.2-.351.225-.652.075-.3-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.235-.245-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01s-.527.075-.803.376c-.276.3-1.054 1.03-1.054 2.512s1.079 2.914 1.23 3.115c.15.2 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.9-.12.582-.351 1.782-1.454 2.033-2.132.25-.678.25-1.258.175-1.383-.075-.125-.276-.201-.577-.351z" />
  </svg>
);

interface WhatsAppLiveChatProps {
  locale: Locale;
}

interface ChatContent {
  title: string;
  subtitle: string;
  onlineBadge: string;
  greetingText: string;
  inputPlaceholder: string;
  sendButton: string;
  quickPromptsLabel: string;
  quickPrompts: { label: string; message: string }[];
  footerNotice: string;
  tooltip: string;
  defaultMessage: string;
}

const CHAT_I18N: Record<Locale, ChatContent> = {
  en: {
    title: 'ACCBCF Secretariat Desk',
    subtitle: 'Official China–Africa Bilateral Platform · Abuja',
    onlineBadge: 'Online · Fast Response',
    greetingText:
      'Hello! Welcome to Africa China Chairmen of Business Forum (ACCBCF) Secretariat. How can our team assist you today with bilateral investment, sector initiatives, or 2026 summit participation?',
    inputPlaceholder: 'Type your message to the Secretariat...',
    sendButton: 'Start Live Chat',
    quickPromptsLabel: 'Frequently Inquired Topics:',
    quickPrompts: [
      {
        label: '🤝 Strategic Partnership',
        message: 'Hello ACCBCF Secretariat, I would like to explore strategic partnership and institutional cooperation.',
      },
      {
        label: '🏭 Sector Project Matching',
        message: 'Hello, I am interested in project matchmaking within the 12 Priority Action Sectors.',
      },
      {
        label: '📅 2026 Summit Participation',
        message: 'Hello, please share delegate registration details for the 2026 ACCBCF Abuja Summit.',
      },
      {
        label: '🏛️ Diplomatic / G2B Protocol',
        message: 'Hello, our organization requests bilateral protocol alignment and secretariat consultation.',
      },
    ],
    footerNotice: 'Federal Ministry of Industry, Trade & Investment · Encrypted Direct Channel',
    tooltip: 'WhatsApp Live Chat · Online',
    defaultMessage: 'Hello ACCBCF Secretariat, I would like to inquire about bilateral business cooperation.',
  },
  zh: {
    title: '非洲中国会长论坛常设秘书处',
    subtitle: '中非经贸投资双边官方专属服务台 · 阿布贾',
    onlineBadge: '在线中 · 实时响应',
    greetingText:
      '您好！欢迎联络非洲中国会长论坛（ACCBCF）常设秘书处。请问有什么经贸投资合作、产业项目落地、入会准入或2026阿布贾成立大会事宜可以协助您？',
    inputPlaceholder: '输入您向秘书处咨询的合作事宜...',
    sendButton: '开启 WhatsApp 实时对话',
    quickPromptsLabel: '常用快速咨询主题：',
    quickPrompts: [
      {
        label: '🤝 政企战略合作对接',
        message: '您好，我们希望与非洲中国会长论坛对接政企战略合作与经贸机制。',
      },
      {
        label: '🏭 十二大重点产业落地',
        message: '您好，我们对中非十二大重点产业的项目配对与投资政策落地感兴趣，请提供具体指南。',
      },
      {
        label: '📅 2026成立大会参会',
        message: '您好，请提供非洲中国会长论坛2026全球成立大会与博览会代表团参会申请详情。',
      },
      {
        label: '🏛️ 官方照会与考察互访',
        message: '您好，我们希望通过论坛常设秘书处安排双边政府代表团高层互访与商务考察。',
      },
    ],
    footerNotice: '尼日利亚阿布贾联邦工业、贸易和投资部驻地 · 官方加密直通专线',
    tooltip: 'WhatsApp 实时咨询 · 在线',
    defaultMessage: '您好，我想咨询非洲中国会长论坛相关商务合作与代表团对接事宜。',
  },
  fr: {
    title: 'Secrétariat Permanent ACCBCF',
    subtitle: 'Plateforme Bilatérale Officielle Afrique–Chine · Abuja',
    onlineBadge: 'En ligne · Réponse rapide',
    greetingText:
      'Bonjour ! Bienvenue au Secrétariat de l’Africa China Chairmen of Business Forum (ACCBCF). Comment notre équipe peut-elle vous assister aujourd’hui concernant les investissements bilatéraux ou le sommet d’Abuja ?',
    inputPlaceholder: 'Écrivez votre message au Secrétariat...',
    sendButton: 'Démarrer la discussion WhatsApp',
    quickPromptsLabel: 'Sujets fréquemment abordés :',
    quickPrompts: [
      {
        label: '🤝 Partenariat Stratégique',
        message: 'Bonjour, je souhaite explorer un partenariat institutionnel avec l’ACCBCF.',
      },
      {
        label: '🏭 12 Secteurs Prioritaires',
        message: 'Bonjour, nous souhaitons des détails sur les projets des secteurs prioritaires.',
      },
      {
        label: '📅 Sommet d’Abuja 2026',
        message: 'Bonjour, merci de nous transmettre les modalités de participation au sommet 2026.',
      },
    ],
    footerNotice: 'Ministère Fédéral de l’Industrie, du Commerce et des Investissements · Canal sécurisé',
    tooltip: 'Discussion en direct WhatsApp',
    defaultMessage: 'Bonjour Secrétariat ACCBCF, je souhaite obtenir des informations de coopération commerciale.',
  },
  ar: {
    title: 'مكتب الأمانة العامة لمنتدى ACCBCF',
    subtitle: 'المنصة الرسمية الثنائية الإفريقية الصينية · أبوجا',
    onlineBadge: 'متصل الآن · استجابة سريعة',
    greetingText:
      'مرحباً بكم في الأمانة العامة لمنتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية (ACCBCF). كيف يمكننا مساعدتكم اليوم في مشاريع الاستثمار الثنائي أو القمة الرسمية؟',
    inputPlaceholder: 'اكتب رسالتك إلى الأمانة العامة...',
    sendButton: 'بدء المحادثة عبر واتساب',
    quickPromptsLabel: 'مواضيع الاستفسار الشائعة:',
    quickPrompts: [
      {
        label: '🤝 شراكة استراتيجية',
        message: 'مرحباً، نود استكشاف الشراكة الاستراتيجية مع منتدى ACCBCF.',
      },
      {
        label: '🏭 قطاعات العمل ذات الأولوية',
        message: 'مرحباً، نود الاستفسار حول فرص الاستثمار في القطاعات الـ 12 ذات الأولوية.',
      },
      {
        label: '📅 المشاركة في قمة أبوجا',
        message: 'مرحباً، يرجى تزويدنا بتفاصيل التسجيل في قمة أبوجا 2026.',
      },
    ],
    footerNotice: 'وزارة الصناعة والتجارة والاستثمار الفيدرالية، أبوجا · قناة اتصال مشفرة',
    tooltip: 'محادثة مباشرة عبر واتساب',
    defaultMessage: 'مرحباً، أود الاستفسار حول فرص التعاون التجاري الثنائي عبر منتدى ACCBCF.',
  },
  pt: {
    title: 'Secretariado ACCBCF',
    subtitle: 'Plataforma Oficial Bilateral África–China · Abuja',
    onlineBadge: 'Online · Resposta Rápida',
    greetingText:
      'Olá! Bem-vindo ao Secretariado do Africa China Chairmen of Business Forum (ACCBCF). Como nossa equipe pode ajudar hoje com investimentos bilaterais ou participação na cúpula?',
    inputPlaceholder: 'Digite sua mensagem para o Secretariado...',
    sendButton: 'Iniciar Conversa no WhatsApp',
    quickPromptsLabel: 'Tópicos Frequentes:',
    quickPrompts: [
      {
        label: '🤝 Parceria Estratégica',
        message: 'Olá, gostaria de explorar cooperação estratégica com o ACCBCF.',
      },
      {
        label: '🏭 Setores Prioritários',
        message: 'Olá, tenho interesse no matchmaking de projetos nos setores prioritários.',
      },
      {
        label: '📅 Cúpula de Abuja 2026',
        message: 'Olá, por favor envie informações de inscrição para a cúpula 2026.',
      },
    ],
    footerNotice: 'Ministério Federal de Indústria, Comércio e Investimentos · Canal Seguro',
    tooltip: 'Chat ao vivo WhatsApp',
    defaultMessage: 'Olá, gostaria de solicitar informações sobre cooperação empresarial com o ACCBCF.',
  },
};

export const WhatsAppLiveChat: React.FC<WhatsAppLiveChatProps> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);
  const isRtl = locale === 'ar';
  const t = CHAT_I18N[locale] || CHAT_I18N.en;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = (customText?: string) => {
    const textToSend = customText || message.trim() || t.defaultMessage;
    const phone = '2349160166906';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(message);
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed z-50 bottom-5 sm:bottom-7 ${
        isRtl ? 'left-5 sm:left-7' : 'right-5 sm:right-7'
      }`}
      aria-label="WhatsApp Live Chat Support"
    >
      {/* Popover Live Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`mb-4 w-[92vw] max-w-[390px] bg-white rounded-3xl shadow-2xl border border-gray-200/80 overflow-hidden flex flex-col text-accbcf-charcoal ${
              isRtl ? 'origin-bottom-left' : 'origin-bottom-right'
            }`}
          >
            {/* WhatsApp Green Top Header */}
            <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white p-4 sm:p-5 relative flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 p-1 border border-white/25 flex items-center justify-center text-white backdrop-blur-sm shadow-inner">
                    <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                  </div>
                  {/* Live Pulse Dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-sm sm:text-base leading-tight truncate text-white">
                      {t.title}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-accbcf-gold flex-shrink-0" />
                  </div>
                  <p className="text-[11px] text-white/80 leading-tight truncate mt-0.5">
                    {t.subtitle}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-200 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span>{t.onlineBadge}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Live Chat"
                className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/30 text-white/90 hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Background & Message Area */}
            <div className="p-4 sm:p-5 bg-[#ECE5DD]/40 max-h-[380px] overflow-y-auto space-y-4">
              {/* Date stamp indicator */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/5 text-gray-600 border border-black/5">
                  <Clock className="w-2.5 h-2.5" />
                  <span>Abuja Live Desk · UTC+1</span>
                </span>
              </div>

              {/* Secretariat Greeting Bubble */}
              <div className="flex items-start gap-2.5 max-w-[92%]">
                <div className="bg-white rounded-2xl rounded-tl-sm p-3.5 shadow-sm border border-gray-200/60 text-xs sm:text-sm text-gray-800 leading-relaxed relative">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#128C7E] pb-1">
                    <span>ACCBCF Secretariat</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500 ml-1 inline" />
                  </div>
                  <p className="text-gray-700">{t.greetingText}</p>
                  <div className="text-[10px] text-gray-400 text-right mt-1.5 font-mono">
                    Official WhatsApp Hotline: +234 916 016 6906
                  </div>
                </div>
              </div>

              {/* Quick Prompt Inquiry Chips */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  {t.quickPromptsLabel}
                </p>
                <div className="flex flex-col gap-1.5">
                  {t.quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openWhatsApp(prompt.message)}
                      className="text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-gray-200/90 text-gray-700 hover:text-emerald-800 font-medium transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <span>{prompt.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Composer & Action Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-100 space-y-2.5">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  className="flex-1 px-3.5 py-2.5 rounded-full border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  aria-label="Send WhatsApp message"
                  className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Instant Direct Launch Button */}
              <button
                type="button"
                onClick={() => openWhatsApp(message)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>{t.sendButton}</span>
              </button>

              {/* Official Seal Footnote */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 pt-1 text-center">
                <ShieldCheck className="w-3 h-3 text-accbcf-gold flex-shrink-0" />
                <span className="truncate">{t.footerNotice}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button & Tooltip Bubble */}
      <div className="flex items-center gap-3">
        {/* Soft Greeting Tooltip (auto-displayed on load, toggleable) */}
        <AnimatePresence>
          {!isOpen && showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -10 : 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#001D3D] text-white border border-accbcf-gold/40 shadow-2xl cursor-pointer group hover:bg-[#002855] transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              <div className="text-xs font-semibold">
                <span className="text-accbcf-gold font-bold">{t.tooltip}</span>
                <span className="text-white/80 block text-[10px] leading-tight">
                  +234 916 016 6906
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-white/50 hover:text-white ml-1"
                aria-label="Dismiss tooltip"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Floating Circular WhatsApp Button */}
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open WhatsApp Live Chat"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white flex items-center justify-center shadow-2xl border-2 border-white/80 hover:shadow-emerald-500/40 transition-shadow focus:outline-none focus:ring-4 focus:ring-emerald-400/40 cursor-pointer"
        >
          {/* Animated Green Pulse Rings */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

          {/* Active Online Status Badge */}
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>

          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <WhatsAppIcon className="w-8 h-8 text-white drop-shadow-sm" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

