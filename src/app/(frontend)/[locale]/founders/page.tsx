import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Globe,
  Landmark,
  BookOpen,
  HeartHandshake,
  MapPin,
  ChevronRight,
  Sparkles,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { normalizeLocale } from '@/lib/content';
import type { Locale } from '@/lib/content';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'fr' },
    { locale: 'ar' },
    { locale: 'pt' },
  ];
}

const PAGE_META: Record<Locale, { title: string; desc: string }> = {
  en: {
    title: 'Founder & Co-Founder | Africa China Chairmen of Business Forum (ACCBCF)',
    desc: 'Meet High Chief Mike Zheng Xiaopeng (Founder & National Chairman) and Chief Dr. William Deiyan Towah (Co-Founder) leading ACCBCF from Abuja, Nigeria.',
  },
  zh: {
    title: '创会领袖与联合发起人 | 非洲中国会长论坛 (ACCBCF)',
    desc: '认识非洲中国会长论坛创会全国主席郑晓鹏大酋长与联合发起人威廉·德扬·托瓦博士大酋长，领航非中高层经贸、投资与主权友好合作。',
  },
  fr: {
    title: 'Fondateur & Co-Fondateur | Forum des Présidents d’Entreprises Afrique–Chine (ACCBCF)',
    desc: 'Découvrez le Grand Chef Mike Zheng Xiaopeng (Fondateur et Président National) et le Chef Dr. William Deiyan Towah (Co-Fondateur), dirigeants de l’ACCBCF.',
  },
  ar: {
    title: 'المؤسس والمؤسس المشارك | منتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية (ACCBCF)',
    desc: 'تعرف على الزعيم مايك تشنغ شياوبنغ (المؤسس ورئيس مجلس الإدارة الوطني) والزعيم د. ويليام ديان تواه (المؤسس المشارك) في قيادة المنتدى.',
  },
  pt: {
    title: 'Fundador & Co-Fundador | Fórum de Presidentes de Negócios África–China (ACCBCF)',
    desc: 'Conheça o Alto Chefe Mike Zheng Xiaopeng (Fundador e Presidente Nacional) e o Chefe Dr. William Deiyan Towah (Co-Fundador), líderes do ACCBCF.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const meta = PAGE_META[locale] || PAGE_META.en;

  return {
    title: meta.title,
    description: meta.desc,
    openGraph: {
      title: meta.title,
      description: meta.desc,
      images: [
        {
          url: '/images/founder/chief_mike_zheng_xiaopeng.jpg',
          width: 1200,
          height: 630,
          alt: 'High Chief Mike Zheng Xiaopeng & Chief Dr. William Deiyan Towah',
        },
      ],
    },
  };
}

export default async function FoundersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const isZh = locale === 'zh';

  const strings = {
    badge: isZh ? '论坛创会领导层' : 'Institutional Leadership & Founders',
    heroTitle: isZh ? '非中高层经贸合作的开创者与领航者' : 'Pioneers of Africa–China High-Level Economic Cooperation',
    heroSubtitle: isZh
      ? '汇聚主权互信、跨国产业投资、外交法治与传统权威，由常设秘书处所在地尼日利亚阿布贾联邦工业贸易与投资部辐射全非与全球。'
      : 'Bridging sovereign diplomacy, industrial enterprise, transnational public finance, and traditional royal heritage from the Permanent Secretariat at the Federal Ministry of Industry, Trade and Investment in Abuja.',
    founderTag: isZh ? '创会全国主席' : 'Founder & National Chairman',
    coFounderTag: isZh ? '联合发起人 · 外交与公共政策领袖' : 'Co-Founder · Diplomatic & Policy Leadership',
    chieftaincyTitle: isZh ? '非洲多国传统大酋长荣衔' : 'African Traditional Chieftaincy Titles',
    keyPositions: isZh ? '核心社会兼职与领导职务' : 'Institutional Leadership & Executive Footprint',
    educationTitle: isZh ? '学术背景与工程造诣' : 'Education & Engineering Background',
    careerHighlight: isZh ? '非中深耕十五载历程' : '15+ Years Driving Africa–China Relations',
    diplomaticSectionTitle: isZh ? '高层外交会见与主权治理履职实录' : 'High-Level Bilateral & Royal Diplomatic Engagements',
    diplomaticSectionSubtitle: isZh
      ? '与尼日利亚联邦部长、各州州长、驻非与驻华大使、非洲传统王室领袖的战略会见与经贸合作落地。'
      : 'Photographic archive of bilateral summits with State Governors, Federal Ministers, Royal Monarchs, and International Ambassadors.',
    philanthropyTitle: isZh ? '教育普惠与全非公益行动' : 'Philanthropy & Pan-African Community Empowerment',
    philanthropyDesc: isZh
      ? '深入尼日利亚卡诺州王宫、埃努古州、纳萨拉瓦州凯菲以及加纳阿散蒂王国多所学校，资助数千名贫困学子，赠送图书与教学物资，点亮非中青年梦想。'
      : 'Empowering children and youth across the Palace of the Emir of Kano, Enugu State, Nasarawa State, and the Ashanti Kingdom in Ghana with books, writing materials, and educational scholarships.',
  };

  const chieftaincyList = [
    {
      title: isZh ? '奥通巴·迈克大酋长 (High Chief Otunba Mike)' : 'High Chief Otunba Mike',
      region: isZh ? '尼日利亚奥贡州阿戈-伊沃耶王国' : 'Ago-Iwoye Kingdom, Ogun State, Nigeria',
    },
    {
      title: isZh ? '第一大酋长 (High Chief Onodebeze 1)' : 'High Chief Onodebeze 1',
      region: isZh ? '尼日利亚埃努古州' : 'Enugu State, Nigeria',
    },
    {
      title: isZh ? '第一大酋长 (High Chief Okwen 1)' : 'High Chief Okwen 1',
      region: isZh ? '尼日利亚阿南布拉州' : 'Anambra State, Nigeria',
    },
    {
      title: isZh ? '终身大酋长 (High Chief)' : 'High Chief',
      region: isZh ? '加纳阿散蒂王国 (Ashanti Kingdom)' : 'Ashanti Kingdom, Republic of Ghana',
    },
  ];

  const institutionalRoles = [
    {
      role: isZh ? '创会全国主席' : 'National Chairman & Founder',
      org: isZh ? '非洲中国会长论坛 (ACCBCF)' : 'Africa China Chairmen of Business Council Forum',
    },
    {
      role: isZh ? '秘书长' : 'Secretary General',
      org: isZh ? '尼日利亚中国人民友好协会 (NCPFA)' : 'Nigeria China People’s Friendship Association',
    },
    {
      role: isZh ? '名誉副主席' : 'Honorable Vice Chairman',
      org: isZh ? '义乌中非商会 (YCABC)' : 'Yiwu China Africa Business Council',
    },
    {
      role: isZh ? '总裁 / CEO' : 'Chief Executive Officer',
      org: isZh ? '中非经贸发展有限公司 (CAETD)' : 'China Africa Economic And Trade Development',
    },
    {
      role: isZh ? '社长 / 出版人' : 'CEO & Publisher',
      org: isZh ? '中非新闻社 (Africa China News · ACN)' : 'Africa China News (ACN International)',
    },
    {
      role: isZh ? '总裁 / 董事长' : 'CEO & Managing Director',
      org: isZh ? '中非国际旅行社 (ACTTA) & 中非国际传媒 (ACIM)' : 'Africa China Travel & Tour Agency (ACTTA) & ACIM',
    },
    {
      role: isZh ? '总干事 (DG)' : 'Director General',
      org: isZh ? '尼日利亚与国际文化交流促进中心 (CPNIC)' : 'Center for Promotion of Nigeria and International Culture',
    },
    {
      role: isZh ? '总干事 (DG)' : 'Director General',
      org: isZh ? '中非文化中心 (Africa China Culture Center · ACCC)' : 'Africa China Culture Center (ACCC)',
    },
  ];

  const diplomaticGallery = [
    {
      image: '/images/founder/founder_img_28.jpg',
      caption: isZh ? '与尼日利亚阿南布拉州州长查尔斯·索卢多教授阁下' : 'With Anambra State Governor Prof. Charles Soludo',
      tag: 'G2B Economic Dialogue',
    },
    {
      image: '/images/founder/founder_img_29.jpg',
      caption: isZh ? '与前中国驻尼日利亚特命全权大使崔建春阁下' : 'With Former Chinese Ambassador to Nigeria H.E. Cui Jianchun',
      tag: 'Bilateral Diplomatic Mission',
    },
    {
      image: '/images/founder/founder_img_37.jpg',
      caption: isZh ? '与尼日利亚联邦众议院副议长本杰明·卡卢阁下' : 'With Deputy Speaker, Federal House of Representatives Rt. Hon. Benjamin Kalu',
      tag: 'Legislative Cooperation',
    },
    {
      image: '/images/founder/founder_img_38.jpg',
      caption: isZh ? '与前执政党全国主席、前参议员亚当斯·奥希奥姆霍尔阁下' : 'With Senator Adams Oshiomhole (Former APC National Chairman)',
      tag: 'National Leadership',
    },
    {
      image: '/images/founder/founder_img_40.jpg',
      caption: isZh ? '与约鲁巴传统最高王领伊费皇城奥尼大帝阁下' : 'With His Imperial Majesty The Ooni of Ife, Oba Adeyeye Enitan Ogunwusi',
      tag: 'Royal Cultural Sovereignty',
    },
    {
      image: '/images/founder/founder_img_18.jpg',
      caption: isZh ? '与尼日利亚联邦众议院非中关系委员会主席贾法鲁·雅库布议员' : 'With Hon. Ja’afaru Yakubu, Chairman House Committee on Nigeria-China Relations',
      tag: 'Parliamentary Ties',
    },
    {
      image: '/images/founder/founder_img_21.jpg',
      caption: isZh ? '与塔拉巴州副州长阿尔哈吉·阿米努·阿尔卡利阁下' : 'With Taraba State Deputy Governor Alhaji Aminu Alkali',
      tag: 'Sub-National Investment',
    },
    {
      image: '/images/founder/founder_img_25.jpg',
      caption: isZh ? '与印度尼西亚驻尼日利亚特命全权大使阁下' : 'With H.E. The Ambassador of the Republic of Indonesia to Nigeria',
      tag: 'Multilateral Diplomacy',
    },
  ];

  return (
    <div className="pt-24 pb-24">
      {/* Hero Header */}
      <section className="bg-accbcf-blue-deep text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accbcf-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40 shadow-sm">
            <Award className="w-4 h-4" />
            <span>{strings.badge}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-4xl mx-auto">
            {strings.heroTitle}
          </h1>
          <p className="text-white/85 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-light">
            {strings.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. FOUNDER SPOTLIGHT: HIGH CHIEF MIKE ZHENG XIAOPENG */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Founder Portrait Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-accbcf-blue-deep via-accbcf-blue to-accbcf-blue-deep p-8 sm:p-12 flex flex-col items-center justify-between text-white relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal shadow-md">
                  {strings.founderTag}
                </span>
              </div>

              <div className="w-full space-y-6 my-auto pt-6 text-center">
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-accbcf-gold/70 bg-black/20">
                  <Image
                    src="/images/founder/chief_mike_zheng_xiaopeng.jpg"
                    alt="High Chief Mike Zheng Xiaopeng (郑晓鹏)"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {isZh ? '郑晓鹏 高级大酋长' : 'High Chief Mike Yousuf Ugwu'}
                  </h2>
                  <p className="text-accbcf-gold font-medium text-sm sm:text-base">
                    {isZh ? 'Zheng Xiaopeng · 非洲中国会长论坛创会全国主席' : 'Zheng Xiaopeng · National Chairman & Founder, ACCBCF'}
                  </p>
                  <p className="text-white/70 text-xs flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accbcf-gold" />
                    <span>Abuja, Nigeria · Henan, China</span>
                  </p>
                </div>
              </div>

              {/* Chieftaincy Pill Badge */}
              <div className="w-full mt-6 pt-6 border-t border-white/20 text-center">
                <span className="text-[11px] uppercase tracking-widest text-accbcf-gold font-bold block mb-1">
                  Royal Chieftaincy Recognition
                </span>
                <p className="text-xs text-white/90 font-medium">
                  {isZh
                    ? '加纳阿散蒂王国、尼日利亚奥贡州、埃努古州、阿南布拉州大酋长'
                    : 'High Chief in Ogun, Enugu, Anambra States (Nigeria) & Ashanti Kingdom (Ghana)'}
                </p>
              </div>
            </div>

            {/* Founder Biography & Details Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Vision Quote Box */}
                <div className="p-6 rounded-2xl bg-accbcf-light border-l-4 border-accbcf-gold space-y-2 shadow-sm">
                  <span className="text-accbcf-gold-dark font-serif text-3xl leading-none block">“</span>
                  <p className="font-serif text-base sm:text-lg italic text-accbcf-charcoal leading-relaxed">
                    {isZh
                      ? '汇聚全非与中国政企领袖智慧，打破地理与体制隔阂，以务实的项目、深度的产业互信与持久的民间友谊，铸就非中二十八亿人民共创共享的新繁荣。'
                      : 'Connecting government sovereignty, business councils, and industrial leaders to build an enduring, implementation-oriented partnership that empowers enterprise and delivers shared prosperity across Africa and China.'}
                  </p>
                </div>

                {/* Narrative Bio */}
                <div className="space-y-4 text-accbcf-charcoal text-sm sm:text-base leading-relaxed">
                  <p>
                    {isZh
                      ? '郑晓鹏先生（High Chief Mike Yousuf Ugwu）1982年8月22日出生于中国华夏农耕文明与中原历史发源地河南省。2008年毕业于湖南工程学院电气工程专业，获工学学士学位。毕业后深耕工业电气与工程质量把控领域，随后开启了长达十五年、横跨全非十五个国家的经贸、能源、基建与跨文化深耕之路。'
                      : 'High Chief Mike Yousuf Ugwu (Zheng Xiaopeng) was born in Henan Province, China, renowned as the historic cradle of Chinese civilization and agriculture. He holds a Bachelor of Engineering in Electrical Engineering from Hunan Institute of Engineering University (2008). His career spans over 15 years dedicated to the African continent across more than 15 countries, commanding deep expertise in bilateral trade, energy infrastructure, construction, and cultural diplomacy.'}
                  </p>
                  <p>
                    {isZh
                      ? '作为非洲中国会长论坛（ACCBCF）的创会全国主席，郑晓鹏大酋长兼任尼日利亚中国人民友好协会（NCPFA）秘书长——该机构由尼日利亚前驻华大使群及两国政要共同发起设立。凭借卓越的民间外交与产业落地贡献，他先后被尼日利亚奥贡州阿戈-伊沃耶王国册封为奥通巴·迈克大酋长（High Chief Otunba Mike）、埃努古州册封为第一大酋长（Onodebeze 1）、阿南布拉州册封为第一大酋长（Okwen 1），并荣获西非历史最悠久的加纳阿散蒂王国（Ashanti Kingdom）终身大酋长荣衔。'
                      : 'As National Chairman and Founder of ACCBCF, High Chief Mike Zheng also serves as Secretary General of the Nigeria China People’s Friendship Association (NCPFA)—jointly initiated by distinguished former Nigerian Ambassadors to China. In recognition of his extraordinary contributions to cross-border integration, he was bestowed prestigious traditional Chieftaincy Titles across Nigeria and Ghana, bridging indigenous African royal governance with modern enterprise.'}
                  </p>
                </div>

                {/* Chieftaincy Badges */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accbcf-blue flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-accbcf-gold" />
                    <span>{strings.chieftaincyTitle}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {chieftaincyList.map((c, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 flex items-start gap-2.5"
                      >
                        <Award className="w-4 h-4 text-accbcf-gold flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="block text-xs font-bold text-accbcf-charcoal truncate">
                            {c.title}
                          </span>
                          <span className="block text-[11px] text-accbcf-gray">
                            {c.region}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Positions Grid */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accbcf-blue flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-accbcf-gold" />
                    <span>{strings.keyPositions}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {institutionalRoles.map((r, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-gray-50 border border-gray-200/60 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-accbcf-charcoal block">
                            {r.role}
                          </span>
                          <span className="text-[11px] text-accbcf-gray">
                            {r.org}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CO-FOUNDER SPOTLIGHT: CHIEF DR. WILLIAM DEIYAN TOWAH ("IGWUMBA I") */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Co-Founder Portrait Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0b2447] via-[#19376d] to-[#0b2447] p-8 sm:p-12 flex flex-col items-center justify-between text-white relative order-1 lg:order-2">
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal shadow-md">
                  {strings.coFounderTag}
                </span>
              </div>

              <div className="w-full space-y-6 my-auto pt-6 text-center">
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-accbcf-gold/70 bg-black/20">
                  <Image
                    src="/images/founder/chief_dr_william_towah.jpg"
                    alt="Chief William Deiyan Towah, Ph.D (IGWUMBA I)"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {isZh ? '威廉·德扬·托瓦 博士大酋长' : 'Chief William Deiyan Towah, Ph.D'}
                  </h2>
                  <p className="text-accbcf-gold font-medium text-sm sm:text-base">
                    {isZh
                      ? '“IGWUMBA I” · 西非共同体法院行政与财务司长 · 联合发起人'
                      : '“IGWUMBA I” · Director, ECOWAS Court of Justice · ACCBCF Co-Founder'}
                  </p>
                  <p className="text-white/70 text-xs flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accbcf-gold" />
                    <span>ECOWAS Court of Justice, Abuja · Liberia</span>
                  </p>
                </div>
              </div>

              {/* Chieftaincy Honor Badge */}
              <div className="w-full mt-6 pt-6 border-t border-white/20 text-center">
                <span className="text-[11px] uppercase tracking-widest text-accbcf-gold font-bold block mb-1">
                  Traditional Honor & Award
                </span>
                <p className="text-xs text-white/90 font-medium">
                  {isZh
                    ? '尼日利亚“IGWUMBA I”（土地之傲）大酋长 · 尼日利亚全国学联“希望之徽”勋章'
                    : 'Bestowed “IGWUMBA I” (Pride of the Land) · NANS Iconic Leadership Award “Icon of Hope”'}
                </p>
              </div>
            </div>

            {/* Co-Founder Biography & Details Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-8 flex flex-col justify-between order-2 lg:order-1">
              <div className="space-y-6">
                {/* Vision Quote Box */}
                <div className="p-6 rounded-2xl bg-accbcf-light border-l-4 border-accbcf-blue space-y-2 shadow-sm">
                  <span className="text-accbcf-blue font-serif text-3xl leading-none block">“</span>
                  <p className="font-serif text-base sm:text-lg italic text-accbcf-charcoal leading-relaxed">
                    {isZh
                      ? '推进全非团结、健全公共财政治理与法治化营商环境，是非洲大陆实现真正经济解放与深化非中互利战略合作的基石。'
                      : 'Promoting social justice, fiscal integrity, and structured international cooperation is essential to the economic emancipation of Africa and the realization of genuine win-win development.'}
                  </p>
                </div>

                {/* Narrative Bio */}
                <div className="space-y-4 text-accbcf-charcoal text-sm sm:text-base leading-relaxed">
                  <p>
                    {isZh
                      ? '威廉·德扬·托瓦博士大酋长（Chief Dr. William Deiyan Towah）现常驻尼日利亚阿布贾，担任西非国家经济共同体（ECOWAS）法院行政与财务司司长，此前曾任西共体预算专员。他同时兼任加纳阿克拉非洲选举与治理中心（ACEG）公共政策高级顾问。在学术领域，托瓦博士曾受邀担任美国明尼苏达圣玛丽天主教大学、美国国家美洲大学客座讲师，以及利比里亚大学资深高级讲师，著有两部学术专著并发表多篇公共管理论文。'
                      : 'Chief Dr. William Deiyan Towah is a senior ECOWAS Diplomat resident in Abuja, Nigeria, currently serving as Director of Administration and Finance at the ECOWAS Court of Justice, having previously served as Professional Officer In-Charge of Budget of ECOWAS. He serves as Senior Consultant for Public Policy at the African Center for Elections and Governance (ACEG) in Accra, Ghana, and has lectured at Saint Mary’s University of Minnesota (USA), National American University, and the University of Liberia.'}
                  </p>
                  <p>
                    {isZh
                      ? '在利比里亚共和国政府，托瓦博士曾历任农业部副部长兼代部长、财政部负责支出与债务管理的副部长、邮电部副部长、国家粮食援助总署署长、国家住房储蓄银行副总裁、国家住房署总经理，以及公共工程部和财政部资深顾问。他曾先后出任农业与合作开发银行（ACDB）、森林开发署（FDA）、利比里亚农产与营销公司（LPMC）董事会主席。'
                      : 'In public service, Dr. Towah served the Government of Liberia as Deputy Minister and Acting Minister of Agriculture, Deputy Minister of Finance for Expenditure & Debt Management, and Deputy Minister of Post & Telecommunications. He chaired the Boards of the Agriculture & Cooperative Development Bank (ACDB), Forestry Development Authority (FDA), and Liberia Produce and Marketing Corporation (LPMC), standing as a primary architect of Liberia’s PFM reforms, HIPC debt relief, and PRSP framework.'}
                  </p>
                </div>

                {/* Academic & Professional Credentials */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accbcf-blue flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-accbcf-gold" />
                    <span>{isZh ? '学术学位与专著造诣' : 'Scholarly Background & Degrees'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                      <span className="font-bold text-accbcf-charcoal block">Ph.D. in Public Policy</span>
                      <span className="text-[11px] text-accbcf-gray">Walden University, USA (Leadership & Public Management)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                      <span className="font-bold text-accbcf-charcoal block">Master in Management</span>
                      <span className="text-[11px] text-accbcf-gray">Saint Mary’s (Catholic) Univ. of Minnesota, USA</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                      <span className="font-bold text-accbcf-charcoal block">B.Sc. in Accounting</span>
                      <span className="text-[11px] text-accbcf-gray">University of Liberia · Author of 2 Published Books</span>
                    </div>
                  </div>
                </div>

                {/* Public Governance & Architectural Track Record */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accbcf-blue flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-accbcf-gold" />
                    <span>{isZh ? '国家治理与区域宏观改革成就' : 'Macroeconomic Reforms & Public Governance'}</span>
                  </h4>
                  <div className="space-y-2 text-xs text-accbcf-charcoal">
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        {isZh
                          ? '利比里亚国家公共财政管理（PFM）改革计划与“重债穷国”（HIPC）债务减免计划的核心缔造者。'
                          : 'Principal Architect of Liberia’s Public Financial Management (PFM) Reforms and Enhanced HIPC Debt Relief Initiative.'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        {isZh
                          ? '利比里亚国家减贫战略文件（PRSP）主要起草人之一，指导十亿美元级国际受援与发展融资落地。'
                          : 'Lead Drafter of the Liberia Poverty Reduction Strategy Paper (PRSP), steering multi-million dollar multilateral development financing.'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        {isZh
                          ? '荣获尼日利亚传统酋长爵位“IGWUMBA I”（土地之傲）及全国学联授予的“希望之徽”杰出领袖勋章。'
                          : 'Bestowed the traditional Chieftaincy Title “IGWUMBA I” (Pride of the Land) in Nigeria and the NANS Iconic Leadership Award.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DIPLOMATIC & ROYAL ENGAGEMENTS GALLERY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-blue/10 text-accbcf-blue border border-accbcf-blue/20">
            Diplomatic Archive
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-accbcf-charcoal">
            {strings.diplomaticSectionTitle}
          </h2>
          <p className="text-accbcf-gray max-w-2xl mx-auto text-sm sm:text-base">
            {strings.diplomaticSectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {diplomaticGallery.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-accbcf-blue-deep/90 text-white backdrop-blur-sm shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs sm:text-sm font-medium text-accbcf-charcoal leading-snug">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PHILANTHROPY & SOCIAL IMPACT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-accbcf-blue-deep to-accbcf-blue text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold text-accbcf-charcoal">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{strings.philanthropyTitle}</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              {isZh ? '赋能非洲青年，传递非中世代友谊' : 'Empowering African Youth & Strengthening Generations of Friendship'}
            </h3>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {strings.philanthropyDesc}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-accbcf-gold">
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">
                📍 Kano Emirate Palace
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">
                📍 Enugu State Schools
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">
                📍 Keffi, Nasarawa State
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">
                📍 Ashanti Kingdom, Ghana
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Permanent Secretariat Contact Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-center space-y-2 text-xs text-accbcf-gray">
          <p className="font-bold text-accbcf-charcoal text-sm">
            {isZh ? '常设秘书处官方联络处 · 尼日利亚阿布贾' : 'ACCBCF Permanent Secretariat · Leadership Office'}
          </p>
          <p>
            Block C, Old Federal Secretariat, Area 1, Garki, Abuja, Federal Capital Territory, Nigeria
          </p>
          <p className="text-accbcf-blue font-medium">
            Email: mikeyousuf2022@gmail.com · secretariat@accbcf.org
          </p>
        </div>
      </section>
    </div>
  );
}

