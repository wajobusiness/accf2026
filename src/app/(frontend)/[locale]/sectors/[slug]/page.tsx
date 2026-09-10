import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  CheckCircle2,
  Building,
  Sprout,
  Gem,
  Zap,
  Cpu,
  TrainTrack,
  HeartPulse,
  Landmark,
  Radio,
  Truck,
  Leaf,
  Compass,
  Layers,
  Sparkles,
  MapPin,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { PRIORITY_SECTORS, normalizeLocale, SITE_INFO } from '@/lib/content';
import type { Locale } from '@/lib/content';

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh', 'fr', 'ar', 'pt'];
  const params: { locale: string; slug: string }[] = [];
  for (const sector of PRIORITY_SECTORS) {
    for (const locale of locales) {
      params.push({ locale, slug: sector.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const sector = PRIORITY_SECTORS.find((s) => s.slug === slug);
  if (!sector) return { title: 'Sector Not Found' };

  const title = `${sector.name[locale]} | ACCBCF Action Briefing`;

  return {
    title,
    description: sector.description[locale],
    alternates: {
      canonical: `/${locale}/sectors/${slug}`,
      languages: {
        en: `/en/sectors/${slug}`,
        zh: `/zh/sectors/${slug}`,
        fr: `/fr/sectors/${slug}`,
        ar: `/ar/sectors/${slug}`,
        pt: `/pt/sectors/${slug}`,
      },
    },
    openGraph: {
      title,
      description: sector.description[locale],
      type: 'article',
      images: [
        {
          url: '/images/accbcf-emblem.jpg',
          width: 800,
          height: 800,
          alt: `${sector.name[locale]} - ACCBCF Official Seal`,
        },
      ],
    },
  };
}

const UI_TEXT = {
  en: {
    backToAll: 'All 12 Priority Sectors',
    sectorBriefing: 'Official Action Briefing',
    strategicMandate: 'Strategic Action Mandate',
    valueAddition: 'Local Value Addition Strategy',
    bilateralMechanism: 'Bilateral Cooperation Mechanism',
    policyAlignment: 'Policy & Regulatory Alignment',
    actionCommittee: 'Designated Committee',
    corePillars: 'Core Strategic Pillars',
    investmentOpportunities: 'Priority Investment & Matching Opportunities',
    readyToPartner: 'Ready to Structure Bilateral Action in This Sector?',
    readySubtitle:
      'Connect with the ACCBCF Secretariat Trade & Investment Desk at the Federal Ministry of Industry, Trade and Investment in Abuja to initiate project onboarding, concession structuring, or strategic matchmaking.',
    inquireBtn: 'Submit Sector Inquiry',
    whatsappDesk: 'Secretariat WhatsApp Hotline',
    otherSectors: 'Explore Other Priority Sectors',
  },
  zh: {
    backToAll: '返回十二大重点产业',
    sectorBriefing: '官方行动战略简报',
    strategicMandate: '战略行动使命与背景',
    valueAddition: '属地化增值跃升路径',
    bilateralMechanism: '双边合作实施机制',
    policyAlignment: '主权政策与自贸区衔接',
    actionCommittee: '专项协同专业委员会',
    corePillars: '核心战略支柱与技术重点',
    investmentOpportunities: '重点投融资与产业配对合作机遇',
    readyToPartner: '准备在该产业推进中非重大项目落地？',
    readySubtitle:
      '诚邀对接非洲中国会长论坛阿布贾常设秘书处经贸投资部，就特许经营权申请、工业园入驻、战略合资及产能对接开展务实磋商。',
    inquireBtn: '提交该产业合作需求',
    whatsappDesk: '秘书处官方微信/WhatsApp专线',
    otherSectors: '浏览其他重点行动产业',
  },
  fr: {
    backToAll: 'Les 12 Secteurs Prioritaires',
    sectorBriefing: 'Dossier d’Action Officiel',
    strategicMandate: 'Mandat Stratégique d’Action',
    valueAddition: 'Stratégie de Valorisation Locale',
    bilateralMechanism: 'Mécanisme de Coopération Bilatérale',
    policyAlignment: 'Alignement Réglementaire et ZLECAf',
    actionCommittee: 'Comité Spécialisé Désigné',
    corePillars: 'Piliers Stratégiques Majeurs',
    investmentOpportunities: 'Opportunités Prioritaires d’Investissement',
    readyToPartner: 'Prêt à Développer un Projet dans ce Secteur ?',
    readySubtitle:
      'Prenez contact avec le Bureau du Commerce et des Investissements du Secrétariat de l’ACCBCF à Abuja pour l’intégration de vos projets et la mise en relation stratégique.',
    inquireBtn: 'Soumettre une Demande pour ce Secteur',
    whatsappDesk: 'Ligne Directe WhatsApp du Secrétariat',
    otherSectors: 'Explorer les Autres Secteurs Prioritaires',
  },
  ar: {
    backToAll: 'جميع القطاعات الـ 12 ذات الأولوية',
    sectorBriefing: 'الملف الاستراتيجي الرسمي',
    strategicMandate: 'المهمة الاستراتيجية ونطاق العمل',
    valueAddition: 'استراتيجية تعظيم القيمة المضافة محلياً',
    bilateralMechanism: 'آلية التعاون الثنائي والتنفيذ',
    policyAlignment: 'المواءمة مع السياسات السيادية ومنطقة التجارة الحرة الأفريقية',
    actionCommittee: 'اللجنة القطاعية المختصة',
    corePillars: 'الركائز الاستراتيجية والتقنية الأساسية',
    investmentOpportunities: 'فرص الاستثمار والمطابقة التجارية ذات الأولوية',
    readyToPartner: 'هل أنت مستعد لهيكلة مشروع ثنائي في هذا القطاع؟',
    readySubtitle:
      'تواصل مع مكتب التجارة والاستثمار بالأمانة العامة لمنتدى ACCBCF في مجمع وزارة الصناعة والتجارة والاستثمار بأبوجا لبدء مطابقة المشاريع والتنسيق المؤسسي.',
    inquireBtn: 'تقديم طلب مطابقة استثمارية في هذا القطاع',
    whatsappDesk: 'الخط المباشر للأمانة العامة عبر واتساب',
    otherSectors: 'استكشف القطاعات الاستراتيجية الأخرى',
  },
  pt: {
    backToAll: 'Todos os 12 Setores Prioritários',
    sectorBriefing: 'Dossiê Estratégico de Ação',
    strategicMandate: 'Mandato Estratégico de Ação',
    valueAddition: 'Estratégia de Agregação de Valor Local',
    bilateralMechanism: 'Mecanismo de Cooperação Bilateral',
    policyAlignment: 'Alinhamento com Políticas e AfCFTA',
    actionCommittee: 'Comitê Setorial Designado',
    corePillars: 'Pilares Estratégicos Centrais',
    investmentOpportunities: 'Oportunidades Prioritárias de Investimento e Parcerias',
    readyToPartner: 'Pronto para Estruturar um Projeto Bilateral neste Setor?',
    readySubtitle:
      'Conecte-se com o Departamento de Comércio e Investimentos da Secretaria da ACCBCF em Abuja para submissão de projetos, concessões e articulação institucional.',
    inquireBtn: 'Enviar Consulta para este Setor',
    whatsappDesk: 'Linha Direta WhatsApp da Secretaria',
    otherSectors: 'Explorar Outros Setores Prioritários',
  },
};

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const isZh = locale === 'zh';
  const isRtl = locale === 'ar';
  const t = UI_TEXT[locale] || UI_TEXT.en;

  const sectorIndex = PRIORITY_SECTORS.findIndex((s) => s.slug === slug);
  if (sectorIndex === -1) notFound();

  const sector = PRIORITY_SECTORS[sectorIndex];
  const sectorNumber = sectorIndex + 1 < 10 ? `0${sectorIndex + 1}` : `${sectorIndex + 1}`;

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-10 h-10 text-accbcf-gold' };
    switch (iconName) {
      case 'Sprout':
        return <Sprout {...props} />;
      case 'Gem':
        return <Gem {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'TrainTrack':
        return <TrainTrack {...props} />;
      case 'HeartPulse':
        return <HeartPulse {...props} />;
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Radio':
        return <Radio {...props} />;
      case 'Truck':
        return <Truck {...props} />;
      case 'Building':
        return <Building {...props} />;
      case 'Leaf':
        return <Leaf {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      default:
        return <Building {...props} />;
    }
  };

  const otherSectors = PRIORITY_SECTORS.filter((s) => s.slug !== slug);

  return (
    <div className="pt-24 pb-20">
      {/* Hero Header Section */}
      <section className="bg-accbcf-blue-deep text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Breadcrumb Navigation */}
          <Link
            href={`/${locale}/sectors`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accbcf-gold hover:text-white transition-colors"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            <span>{t.backToAll}</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-accbcf-gold border border-accbcf-gold/40">
                  <Shield className="w-3.5 h-3.5" />
                  <span>SECTOR {sectorNumber} / 12</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                  {t.sectorBriefing}
                </span>
              </div>

              {/* Title using approved Gold Banner Highlight Box */}
              <h1 className="text-3xl sm:text-5xl font-bold">
                <span className="inline-block bg-accbcf-gold text-accbcf-charcoal px-5 py-1.5 sm:px-7 sm:py-2 font-serif font-bold shadow-md">
                  {sector.name[locale]}
                </span>
              </h1>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed font-medium">
                {sector.description[locale]}
              </p>
            </div>

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 border-2 border-accbcf-gold/50 flex items-center justify-center p-5 shadow-2xl backdrop-blur-md flex-shrink-0">
              {renderIcon(sector.icon)}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Strategic Mandate & Value Addition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Col 1: Action Mandate */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accbcf-blue/10 flex items-center justify-center text-accbcf-blue">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl font-bold text-accbcf-charcoal">
                {t.strategicMandate}
              </h2>
              <p className="text-accbcf-gray text-sm leading-relaxed">
                {sector.details[locale]}
              </p>
            </div>
            {sector.actionCommittee && (
              <div className="pt-4 border-t border-gray-100 text-xs">
                <span className="font-bold text-accbcf-charcoal block mb-1">
                  {t.actionCommittee}:
                </span>
                <span className="text-accbcf-blue font-semibold">
                  {sector.actionCommittee[locale]}
                </span>
              </div>
            )}
          </div>

          {/* Col 2: Value Addition Strategy */}
          <div className="p-8 rounded-3xl bg-accbcf-blue text-white shadow-xl space-y-4 flex flex-col justify-between border-t-4 border-t-accbcf-gold">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-accbcf-gold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl font-bold text-white">
                {t.valueAddition}
              </h2>
              <p className="text-white/90 text-sm leading-relaxed">
                {sector.valueAdditionStrategy ? sector.valueAdditionStrategy[locale] : sector.details[locale]}
              </p>
            </div>
            <div className="pt-4 border-t border-white/15 text-xs text-accbcf-gold font-bold">
              Institutional China-Africa Value Chain Upgrading
            </div>
          </div>

          {/* Col 3: Bilateral Mechanism & Policy Framework */}
          <div className="p-8 rounded-3xl bg-accbcf-light border border-gray-200/90 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accbcf-gold/20 flex items-center justify-center text-accbcf-gold-dark">
                <Building className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl font-bold text-accbcf-charcoal">
                {t.bilateralMechanism}
              </h2>
              <p className="text-accbcf-gray text-sm leading-relaxed">
                {sector.bilateralMechanisms ? sector.bilateralMechanisms[locale] : sector.description[locale]}
              </p>
            </div>
            {sector.policyAlignment && (
              <div className="pt-4 border-t border-gray-200 text-xs space-y-1">
                <span className="font-bold text-accbcf-charcoal block">
                  {t.policyAlignment}:
                </span>
                <p className="text-accbcf-gray text-xs leading-relaxed">
                  {sector.policyAlignment[locale]}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Core Strategic Pillars & Capabilities */}
        {sector.strategicFocus && sector.strategicFocus.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-accbcf-blue">
                Focus Areas
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-accbcf-charcoal mt-1">
                {t.corePillars}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sector.strategicFocus.map((focusItem, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-4 hover:border-accbcf-gold transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-accbcf-gold/15 flex items-center justify-center text-accbcf-charcoal flex-shrink-0 font-bold font-mono text-xs">
                    0{idx + 1}
                  </div>
                  <p className="text-accbcf-charcoal font-medium text-sm sm:text-base leading-relaxed">
                    {focusItem[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Priority Investment & Project Opportunities */}
        {sector.keyOpportunities && sector.keyOpportunities.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-accbcf-blue">
                Bankable Action
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-accbcf-charcoal mt-1">
                {t.investmentOpportunities}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sector.keyOpportunities.map((opp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 shadow-sm hover:shadow-md hover:bg-white hover:border-accbcf-blue/40 transition-all flex items-start gap-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-accbcf-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-accbcf-charcoal">
                      {opp[locale]}
                    </h3>
                    <p className="text-accbcf-gray text-xs">
                      Pre-feasibility alignment, sovereign licensing, and B2B joint venture structuring available through the Secretariat.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct Strategic Action Callout Band */}
        <div className="rounded-3xl bg-gradient-to-r from-accbcf-blue-deep via-accbcf-blue to-accbcf-blue-dark text-white p-8 sm:p-12 border-2 border-accbcf-gold/40 shadow-2xl space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold text-accbcf-charcoal">
              <Shield className="w-3.5 h-3.5" />
              <span>Secretariat Action Desk</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
              {t.readyToPartner}
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              {t.readySubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/${locale}/contact?sector=${sector.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal hover:bg-white hover:text-accbcf-blue transition-all shadow-lg font-mono"
            >
              <span>{t.inquireBtn}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>

            <a
              href={SITE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all font-mono"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{t.whatsappDesk}</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/75">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accbcf-gold flex-shrink-0" />
              <span>{SITE_INFO.hqAddress[locale]}</span>
            </div>
            <div className="text-white/60">
              Official Platform · Federal Ministry of Industry, Trade and Investment
            </div>
          </div>
        </div>

        {/* Adjacent Priority Sectors Navigator */}
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-accbcf-charcoal">
              {t.otherSectors}
            </h2>
            <Link
              href={`/${locale}/sectors`}
              className="text-xs font-bold uppercase tracking-wider text-accbcf-blue hover:text-accbcf-gold transition-colors flex items-center gap-1.5"
            >
              <span>{t.backToAll}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherSectors.slice(0, 6).map((other) => (
              <Link
                key={other.id}
                href={`/${locale}/sectors/${other.slug}`}
                className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-sm hover:border-accbcf-gold hover:shadow-md transition-all group text-center flex flex-col items-center justify-center gap-2"
              >
                <div className="text-accbcf-gold group-hover:text-accbcf-blue transition-colors">
                  {renderIcon(other.icon)}
                </div>
                <span className="font-serif text-xs font-bold text-accbcf-charcoal group-hover:text-accbcf-blue line-clamp-2 transition-colors">
                  {other.name[locale]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

