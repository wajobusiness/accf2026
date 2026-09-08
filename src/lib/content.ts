// ACCBCF Master Content & Multilingual Data Model
// Extracted from ACCBCF Product Bible & Build Prompt

export type Locale = 'en' | 'zh' | 'fr' | 'ar' | 'pt';

export interface LocaleConfig {
  code: Locale;
  label: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'zh', label: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', dir: 'ltr' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'pt', label: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', dir: 'ltr' },
];

export function normalizeLocale(raw?: string): Locale {
  const validLocales: Locale[] = ['en', 'zh', 'fr', 'ar', 'pt'];
  return validLocales.includes(raw as Locale) ? (raw as Locale) : 'en';
}

export type MultilingualText = Record<Locale, string>;
export type BilingualText = MultilingualText;

export interface SectorItem {
  id: string;
  slug: string;
  name: BilingualText;
  description: BilingualText;
  details: BilingualText;
  icon: string;
  strategicFocus?: BilingualText[];
  keyOpportunities?: BilingualText[];
  valueAdditionStrategy?: BilingualText;
  bilateralMechanisms?: BilingualText;
  policyAlignment?: BilingualText;
  actionCommittee?: BilingualText;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: BilingualText;
  shortDescription: BilingualText;
  longDescription: BilingualText;
  icon: string;
}

export interface GovernanceTier {
  id: string;
  name: BilingualText;
  description: BilingualText;
  level: number;
  items?: {
    name: BilingualText;
    role?: BilingualText;
    description?: BilingualText;
  }[];
}

export type Localized<T> = T extends { en: string }
  ? Record<Locale, string>
  : T extends Array<infer U>
  ? Array<Localized<U>>
  : T extends object
  ? { [K in keyof T]: Localized<T[K]> }
  : T;

function localized<T>(data: T): Localized<T> {
  if (Array.isArray(data)) {
    return data.map((item) => localized(item)) as unknown as Localized<T>;
  }
  if (data !== null && typeof data === 'object') {
    if ('en' in data && typeof (data as any).en === 'string') {
      const enVal = (data as any).en;
      const zhVal = (data as any).zh || enVal;
      return {
        en: enVal,
        zh: zhVal,
        fr: (data as any).fr || enVal,
        ar: (data as any).ar || enVal,
        pt: (data as any).pt || enVal,
      } as unknown as Localized<T>;
    }
    const result: any = {};
    for (const [key, val] of Object.entries(data)) {
      result[key] = localized(val);
    }
    return result as Localized<T>;
  }
  return data as unknown as Localized<T>;
}



const RAW_SITE_INFO = {
  name: {
    en: 'Africa China Chairmen of Business Forum',
    zh: '非中企业领袖论坛',
    fr: 'Forum des Présidents d’Entreprises Afrique–Chine',
    ar: 'منتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية',
    pt: 'Fórum de Presidentes de Negócios África–China',
  },
  shortName: 'ACCBCF',
  established: '30 March 2026',
  hqCity: {
    en: 'Abuja, Nigeria',
    zh: '尼日利亚·阿布贾',
    fr: 'Abuja, Nigeria',
    ar: 'أبوجا، نيجيريا',
    pt: 'Abuja, Nigéria',
  },
  hqAddress: {
    en: 'Block D, Federal Ministry of Industry, Trade and Investment, Old Federal Secretariat, Area 1, Garki, Abuja, Nigeria',
    zh: '尼日利亚阿布贾加尔基第一区旧联邦秘书处联邦工业、贸易和投资部D座',
    fr: 'Bloc D, Ministère Fédéral de l’Industrie, du Commerce et des Investissements, Ancien Secrétariat Fédéral, Zone 1, Garki, Abuja, Nigeria',
    ar: 'المبنى D، وزارة الصناعة والتجارة والاستثمار الفيدرالية، الأمانة الفيدرالية القديمة، المنطقة 1، غاركي، أبوجا، نيجيريا',
    pt: 'Bloco D, Ministério Federal de Indústria, Comércio e Investimentos, Antigo Secretariado Federal, Área 1, Garki, Abuja, Nigéria',
  },
  email: 'africachinachairmenforum@gmail.com',
  phone: '+234 916 016 6906',
  whatsapp: '+2349160166906',
  whatsappUrl: 'https://wa.me/2349160166906',
  slogan: {
    en: 'Connecting Governments · Empowering Business · Creating Shared Prosperity',
    zh: '链接政府 · 赋能企业 · 共创繁荣',
    fr: 'Connecter les Gouvernements · Autonomiser les Entreprises · Créer une Prospérité Partagée',
    ar: 'ربط الحكومات · تمكين الأعمال · صناعة الازدهار المشترك',
    pt: 'Conectando Governos · Fortalecendo Empresas · Criando Prosperidade Compartilhada',
  },
  about: {
    en: 'The Africa China Chairmen of Business Forum (ACCBCF) is an international business cooperation platform headquartered in Abuja, Nigeria — serving West Africa, covering the African continent, connecting China, and engaging with the global business community. Established on 30 March 2026 in Abuja, ACCBCF represents a new milestone in institutionalized, professional, and international China–Africa business cooperation.',
    zh: '非中企业领袖论坛（ACCBCF）是一个总部位于尼日利亚阿布贾的国际商业合作平台，立足西非、辐射全非、对接中国、链接全球商界。论坛于2026年3月30日在尼日利亚联邦首都区阿布贾正式成立，标志着中非商业合作迈向制度化、专业化与国际化的全新里程碑。',
    fr: 'L’Africa China Chairmen of Business Forum (ACCBCF) est une plateforme internationale de coopération commerciale dont le siège est situé à Abuja, au Nigeria — servant l’Afrique de l’Ouest, couvrant le continent africain, connectant la Chine et s’engageant auprès de la communauté des affaires mondiale. Établi le 30 mars 2026 à Abuja, l’ACCBCF représente un nouveau jalon dans la coopération commerciale sino-africaine institutionnalisée.',
    ar: 'منتدى رؤساء مجالس إدارات الأعمال الإفريقية الصينية (ACCBCF) هو منصة دولية للتعاون التجاري ومقرها في أبوجا، نيجيريا — تخدم غرب إفريقيا، وتغطي القارة الإفريقية، وتربط الصين، وتتفاعل مع مجتمع الأعمال العالمي. تأسس المنتدى في 30 مارس 2026 في أبوجا ليمثل مرحلة جديدة في مأسسة التعاون التجاري بين إفريقيا والصين.',
    pt: 'O Africa China Chairmen of Business Forum (ACCBCF) é uma plataforma internacional de cooperação empresarial sediada em Abuja, Nigéria — servindo a África Ocidental, cobrindo o continente africano, conectando a China e engajando-se com o ambiente empresarial global. Estabelecido em 30 de março de 2026 em Abuja, o ACCBCF representa um novo marco na cooperação empresarial institucionalizada.',
  },
  vision: {
    en: 'To become a leading Africa–China business cooperation platform connecting governments, business communities, financial institutions, and international organizations — with global influence, credibility, and strong project implementation capability.',
    zh: '成为连接政府、商界、金融机构和国际组织的领先非中商业合作平台，具备全球影响力、崇高信誉与强大的项目落地实施能力。',
    fr: 'Devenir une plateforme de coopération commerciale de premier plan reliant gouvernements, entreprises, institutions financières et organisations internationales avec une solide capacité de mise en œuvre de projets.',
    ar: 'أن نكون منصة رائدة للتعاون التجاري بين إفريقيا والصين تربط الحكومات ومجتمعات الأعمال والمؤسسات المالية والمنظمات الدولية مع تأثير عالمي ومصداقية عالية وقدرة تنفيذية فائقة.',
    pt: 'Tornar-se uma plataforma líder de cooperação empresarial África–China conectando governos, setor privado, instituições financeiras e organizações internacionais com credibilidade e capacidade de execução.',
  },
  mission: {
    en: 'To promote practical cooperation between Africa and China in policy dialogue, trade and investment, industrial cooperation, innovation, financial connectivity, cultural exchange, and sustainable development — contributing to a closer China–Africa community with a shared future.',
    zh: '推动非中在政策对话、经贸投资、产业合作、科技创新、金融互联、人文交流及可持续发展等领域的务实合作，助力构建更加紧密的中非命运共同体。',
    fr: 'Promouvoir une coopération concrète entre l’Afrique et la Chine dans le dialogue politique, le commerce et l’investissement, l’industrie, l’innovation, la connectivité financière et le développement durable.',
    ar: 'تعزيز التعاون العملي بين إفريقيا والصين في الحوار السياسي، التجارة والاستثمار، التعاون الصناعي، الابتكار، والترابط المالي والتنمية المستدامة.',
    pt: 'Promover cooperação prática entre África e China no diálogo de políticas, comércio e investimentos, indústria, inovação e desenvolvimento sustentável.',
  },
  guidingPrinciples: [
    { en: 'Government Guidance', zh: '政府引导' },
    { en: 'Chamber Collaboration', zh: '商会协同' },
    { en: 'Enterprise Leadership', zh: '企业主体' },
    { en: 'Market Orientation', zh: '市场运作' },
    { en: 'Win-Win Cooperation', zh: '合作共赢' },
  ],
  coreValues: [
    {
      name: { en: 'Integrity', zh: '诚信' },
      description: {
        en: 'Upholding international compliance, institutional credibility, and transparent governance in all bilateral initiatives.',
        zh: '在所有双边合作中恪守国际合规底线，树立制度公信力与透明化治理机制。',
      },
    },
    {
      name: { en: 'Professionalism', zh: '专业' },
      description: {
        en: 'Deploying high-caliber sector specialists, rigorous feasibility standards, and institutional-grade project management.',
        zh: '汇聚高水准行业专家团队，践行严谨可行性评估标准与机构级项目落地管控。',
      },
    },
    {
      name: { en: 'Cooperation', zh: '合作' },
      description: {
        en: 'Uniting African leadership and Chinese industry powerhouses for collective economic resilience and growth.',
        zh: '汇集非洲政商领袖与中国产业领军力量，共筑经济韧性与规模化发展新格局。',
      },
    },
    {
      name: { en: 'Innovation', zh: '创新' },
      description: {
        en: 'Pioneering cutting-edge financing models, digital transformation, and industrial value-chain modernization.',
        zh: '开拓创新型投融资架构、数字化转型路径与产业链现代化增值体系。',
      },
    },
    {
      name: { en: 'Sustainability', zh: '可持续' },
      description: {
        en: 'Prioritizing green energy, environmental stewardship, local workforce skilling, and long-term community prosperity.',
        zh: '聚焦绿色清洁能源、生态环境保护、本地技术人才培养及长远社会繁荣。',
      },
    },
    {
      name: { en: 'Mutual Benefit', zh: '互利共赢' },
      description: {
        en: 'Ensuring balanced value creation that accelerates African industrialization while expanding Chinese market partnerships.',
        zh: '构建均衡价值创造机制，加速非洲工业化进程的同时深化中非广阔市场伙伴关系。',
      },
    },
  ],
  futureOutlook: {
    en: 'Looking ahead, ACCBCF will continue to strengthen its headquarters in Abuja as a strategic hub — serving West Africa, covering the African continent, connecting China, and engaging globally. The Forum is committed to becoming an internationally recognized business cooperation platform with strong credibility, influence, and implementation capacity, contributing to sustainable China–Africa cooperation and shared prosperity.',
    zh: '展望未来，ACCBCF将持续巩固阿布贾总部作为核心战略枢纽的支点作用——立足西非、辐射全非、深耕中国、联动全球。论坛致力于建设成为具备全球公信力、号召力与项目落地攻坚能力的高能级平台，为中非可持续合作与共同繁荣注入持久动能。',
  },
};

export const SITE_INFO = localized(RAW_SITE_INFO);

const RAW_STRATEGIC_MODELS = [
  {
    code: 'G2G',
    title: { en: 'Government to Government', zh: '政府对政府' },
    shortDesc: {
      en: 'High-level policy dialogue, bilateral trade frameworks, and sovereign strategic coordination.',
      zh: '高层政策对话、双边经贸框架协议及国家级战略项目协调。',
    },
    detail: {
      en: 'Facilitating direct alignment between African sovereign ministries and Chinese government authorities, shaping conducive policy environments and bilateral trade accords.',
      zh: '促进非洲各国主权部委与中国政府主管部门直接对接，协同完善招商引资优惠政策、关税协定及政府间战略项目支持。',
    },
    color: '#0064B4',
  },
  {
    code: 'G2B',
    title: { en: 'Government to Business', zh: '政府对企业' },
    shortDesc: {
      en: 'Concession policies, Special Economic Zones, and Public-Private Partnerships (PPPs).',
      zh: '特许经营权、自贸工业园区及政府与社会资本合作（PPP）。',
    },
    detail: {
      en: 'Bridging institutional leaders with forward-thinking enterprises to deliver critical national infrastructure, Special Economic Zone concessions, and regulatory fast-tracks.',
      zh: '为优秀企业对接非洲国家级重点特许经营项目、特别经济区专属牌照及监管准入绿色通道，加快落地步伐。',
    },
    color: '#F0B428',
  },
  {
    code: 'B2B',
    title: { en: 'Business to Business', zh: '企业对企业' },
    shortDesc: {
      en: 'Enterprise joint ventures, technology transfer, and continental supply-chain integration.',
      zh: '跨国合资企业组建、技术转移升级与全产业链协同。',
    },
    detail: {
      en: 'Connecting African enterprise chairmen with leading Chinese manufacturing, mining, and technology conglomerates for commercial co-investment and tech transfer.',
      zh: '推动非洲行业龙头企业与中国制造业、矿产、数字化等领军企业深度对接，打造合资实体与跨境产业集群。',
    },
    color: '#DC0000',
  },
  {
    code: 'B2C',
    title: { en: 'Business to Capital', zh: '企业对资本' },
    shortDesc: {
      en: 'Sovereign funds, development finance institutions, private equity, and syndicated project capital.',
      zh: '主权基金、开发性金融机构、私募股权与银团融资。',
    },
    detail: {
      en: 'Mobilizing international capital, multilateral development banks, and institutional investors to finance bankable industrial and infrastructure ventures across Africa.',
      zh: '汇聚国际多边开发银行、主权财富基金与顶尖投行，为非洲高增长潜力的优质工业与基建项目提供全周期资本赋能。',
    },
    color: '#F07828',
  },
];

export const STRATEGIC_MODELS = localized(RAW_STRATEGIC_MODELS);

const RAW_PLATFORM_ADVANTAGES = [
  {
    id: 'gov-conn',
    title: { en: 'Government Connectivity', zh: '政府战略对接' },
    description: {
      en: 'Direct institutional access facilitating bilateral policy dialogue, ministerial coordination, and sovereign trade accords.',
      zh: '畅通高层对话渠道，助力双边政策沟通、部际协调联动与主权级经贸协议达成。',
    },
    icon: 'Landmark',
    stat: '2026',
    statLabel: { en: 'Founded in Abuja', zh: '阿布贾奠基' },
  },
  {
    id: 'ind-collab',
    title: { en: 'Industrial Collaboration', zh: '全产业链协同' },
    description: {
      en: 'Supporting end-to-end industrial chain development, technology localization, and local value addition.',
      zh: '支持全产业链集聚布局，推动高端装备制造、技术本土化落地与资源属地深度增值。',
    },
    icon: 'Factory',
    stat: '12',
    statLabel: { en: 'Priority Sectors', zh: '重点聚焦产业' },
  },
  {
    id: 'inv-prom',
    title: { en: 'Investment Promotion', zh: '投资促进落地' },
    description: {
      en: 'Comprehensive project facilitation, feasibility de-risking, and rapid implementation pipelines.',
      zh: '提供全流程项目推介、政策合规风控及高确定性落地推进服务。',
    },
    icon: 'TrendingUp',
    stat: '4',
    statLabel: { en: 'Cooperation Models', zh: '核心合作模式' },
  },
  {
    id: 'intl-res',
    title: { en: 'International Resource Network', zh: '国际资源网络' },
    description: {
      en: 'Integrating global chambers of commerce, sovereign leaders, and Fortune 500 enterprises.',
      zh: '深度统筹全球各大商会、各级主权机构与世界500强企业战略资源。',
    },
    icon: 'Globe',
    stat: '54+',
    statLabel: { en: 'African Markets Covered', zh: '辐射非洲各国' },
  },
  {
    id: 'fin-serv',
    title: { en: 'Financial Services', zh: '金融资本链接' },
    description: {
      en: 'Tailored cross-border financing architectures, syndicated lending, and financial risk mitigation.',
      zh: '定制跨境多元投融资方案，协调国际银团授信与汇率风险管理机制。',
    },
    icon: 'CreditCard',
    stat: '6',
    statLabel: { en: 'Core Services', zh: '综合服务体系' },
  },
  {
    id: 'intl-comm',
    title: { en: 'International Communication', zh: '国际权威传播' },
    description: {
      en: 'Enhancing diplomatic prestige, high-level media visibility, and global forum representation.',
      zh: '打造具备全球公信力的话语体系，提升双边合作成果的国际权威曝光度。',
    },
    icon: 'Megaphone',
    stat: '100%',
    statLabel: { en: 'Institutional Focus', zh: '专注务实成果' },
  },
];

export const PLATFORM_ADVANTAGES = localized(RAW_PLATFORM_ADVANTAGES);

const RAW_CORE_SERVICES = [
  {
    id: 'gov-coop',
    slug: 'government-cooperation',
    name: { en: 'Government Cooperation', zh: '政府间合作' },
    shortDescription: {
      en: 'High-level policy dialogue, ministerial roundtables, and institutional partnership frameworks.',
      zh: '高级别政策对话、部长级圆桌对话会及机构间合作框架落地。',
    },
    longDescription: {
      en: 'We organize bilateral summits, ministerial delegations, and sovereign roundtables between African national governments and Chinese regulatory bodies. Our team facilitates memorandum of understanding (MoU) negotiations, inter-governmental cooperation agreements, and strategic policy coordination to provide a solid institutional foundation for large-scale economic ventures.',
      zh: '组织非洲各国政府与中国主管部门开展双边高层互访、部长级闭门圆桌会及经贸联委会交流。协助起草并推进政府间谅解备忘录（MoU）与特许协议谈判，解决宏观政策协同难题，为重大战略项目提供坚不可摧的主权背书。',
    },
    icon: 'Landmark',
  },
  {
    id: 'inv-prom',
    slug: 'investment-promotion',
    name: { en: 'Investment Promotion', zh: '招商引资促进' },
    shortDescription: {
      en: 'Targeted investor delegations, site due diligence, feasibility evaluation, and project landing.',
      zh: '组织定向投资考察团、实地尽调、项目可行性评估及全程落地孵化。',
    },
    longDescription: {
      en: 'ACCBCF acts as a premier investment bridge. We curate targeted investor roadshows, organize executive site visits across African economic corridors, conduct preliminary legal and technical feasibility studies, and assist investors through company registration, licensing, tax incentives, and site selection.',
      zh: 'ACCBCF作为顶级投资促进桥梁，精准组织中资企业赴非商务路演与现场勘测，开展前期法律合规与技术可行性预审，全程协助办理企业注册、特许牌照申请、自贸区税收优惠争取与园区选址，大幅缩短项目落地周期。',
    },
    icon: 'Briefcase',
  },
  {
    id: 'fin-serv',
    slug: 'financial-services',
    name: { en: 'Financial Services', zh: '金融资本服务' },
    shortDescription: {
      en: 'Project debt/equity structuring, sovereign loan advisory, and multilateral fund matching.',
      zh: '项目股债架构设计、主权贷款顾问、多边开发基金对接与跨境结算。',
    },
    longDescription: {
      en: 'Our financial advisory team works closely with Chinese state banks, multilateral development finance institutions, and private equity funds. We help package bankable project proposals, syndicate export-credit financing, structure concessionary credit lines, and explore local-currency settlement mechanisms.',
      zh: '金融专家团队紧密联动中资大型金融机构、国际多边开发银行及中非产业基金，协助企业打磨高可融性（Bankable）项目方案，搭建出口买方信贷、银团贷款与本币互换跨境结算通道，有效平抑外汇波动风险。',
    },
    icon: 'CreditCard',
  },
  {
    id: 'legal-comp',
    slug: 'legal-compliance',
    name: { en: 'Legal & Compliance', zh: '法律与合规保障' },
    shortDescription: {
      en: 'Cross-border regulatory advisory, arbitration facilitation, contract due diligence, and tax structuring.',
      zh: '跨境政策法规咨询、商事争议调解、严谨合同尽调及财税架构合规。',
    },
    longDescription: {
      en: 'Operating in Africa requires clear legal foresight. The China–Africa Business Mediation Center under our Secretariat provides commercial mediation, intellectual property safeguarding, labor regulation advisory, and dispute resolution to protect stakeholder investments and ensure long-term stability.',
      zh: '出海投资合规先行。论坛秘书处下设中非商事调解中心，联合中非权威法务智库与仲裁机构，为企业提供属地劳工法规遵从、知识产权保护、环境社会治理（ESG）审查及高效商事纠纷预防与调解机制。',
    },
    icon: 'Scale',
  },
  {
    id: 'intl-comm',
    slug: 'international-communication',
    name: { en: 'International Communication', zh: '国际公关与传媒' },
    shortDescription: {
      en: 'Global press releases, diplomatic briefings, documentary showcases, and bilateral forums.',
      zh: '全球官方新闻发布、外交吹风会、重点项目纪录片推介与国际论坛承办。',
    },
    longDescription: {
      en: 'Our Trade & Investment Department and International Media Center build narrative power for China-Africa partnerships. We produce institutional reports, host press conferences, manage multilingual digital releases, and ensure that key economic milestones gain positive, authoritative global coverage.',
      zh: '经贸投资部与国际传媒中心协同发力，构建积极客观的国际话语阵地。编纂发布年度双边经贸白皮书，统筹多语种全球新闻通发，策划重磅论坛峰会现场直播与政商名家访谈，树立中非务实合作典范形象。',
    },
    icon: 'Globe2',
  },
  {
    id: 'biz-match',
    slug: 'business-matching',
    name: { en: 'Business Matching', zh: '精准商业配对' },
    shortDescription: {
      en: 'Precision B2B matchmaking, executive networking, and joint venture brokerage.',
      zh: '一对一精准B2B匹配、高端企业家闭门交流会与合资企业促成。',
    },
    longDescription: {
      en: 'We connect African business leaders with counterpart Chinese enterprise chairmen. Through proprietary sector databases, confidential B2B sessions, and customized partnership criteria, we accelerate the formation of joint ventures, OEM supply contracts, and technology licensing agreements.',
      zh: '建立中非领军企业专属数据库，常态化举办闭门董事长对话会与采购供需对接会。针对技术出海、原产地组装（CKD/SKD）、代工采购等具体诉求，实现点对点精准破冰，促成战略合资联盟。',
    },
    icon: 'Users',
  },
];

export const CORE_SERVICES: ServiceItem[] = localized(RAW_CORE_SERVICES) as unknown as ServiceItem[];

const RAW_PRIORITY_SECTORS = [
  {
    id: 'agri',
    slug: 'agriculture',
    name: { en: 'Agriculture & Agro-Processing', zh: '农业与农产品深加工' },
    description: {
      en: 'Modern mechanized farming, seed technology, grain storage, irrigation, and food processing value chains.',
      zh: '现代化机械化种植、优良种苗育种、粮食仓储物流、智能节水灌溉与农副产品出口深加工。',
    },
    details: {
      en: 'Africa possesses 60% of the world uncultivated arable land. ACCBCF prioritizes partnerships in industrial-scale grain farming, cassava and palm oil processing, cold storage chains, and agricultural machinery assembly to achieve continental food sovereignty and export capabilities.',
      zh: '非洲拥有全球60%未开垦可耕地。论坛聚焦现代农机本地组装、杂交水稻与耐旱农作物试验田、木薯与棕榈油深加工厂，以及产地冷链仓储网络建设，切实助力非洲筑牢粮食安全根基并拓展对外农贸出口。',
    },
    icon: 'Sprout',
    strategicFocus: [
      { en: 'Industrial-scale grain and staple crop farming with modern seed technologies', zh: '主粮规模化机械化种植与耐旱杂交优良种苗推广' },
      { en: 'Cassava, palm oil, cocoa, and cashew in-country processing and packaging', zh: '木薯淀粉、棕榈油精炼、可可与腰果属地化精深加工' },
      { en: 'Temperature-controlled cold chain logistics and post-harvest storage hubs', zh: '产地温控冷链仓储网络与粮食减损保鲜基础设施' },
      { en: 'Assembly and servicing of agricultural tractors and automated irrigation tools', zh: '中小型农业拖拉机本地组装基地与智能节水灌溉技术' },
    ],
    keyOpportunities: [
      { en: 'Cassava Starch & Bio-Industrial Processing Hub in Ogun State, Nigeria', zh: '尼日利亚奥贡州木薯深加工与工业变性淀粉产业基地' },
      { en: 'Commercial Rice Seed Multiplication & Processing Mill (50,000 MT/year)', zh: '年产5万吨商业杂交水稻繁育基地与现代化成套碾米厂' },
      { en: 'Export-Oriented Cashew Nut Cracking & Refining Facilities', zh: '面向中非贸易的出口级腰果脱壳与脱脂精炼深加工厂' },
      { en: 'Agricultural Mechanization Assembly Plant for African Smallholders', zh: '面向非洲中小农户的普及型中轻型农机CKD组装产线' },
    ],
    valueAdditionStrategy: {
      en: 'Shifting African agriculture from raw subsistence output to high-margin processed food exports, preventing 40% post-harvest losses and capturing continental retail value.',
      zh: '推动非洲农业从粗放原料初级输出向高附加值预包装食品制造跃迁，减少40%产后损耗，全面占领非洲大陆零售市场终端价值。',
    },
    bilateralMechanisms: {
      en: 'G2B agro-allied concession agreements, B2B farming cooperatives joint ventures, and Chinese agricultural technology demonstration parks.',
      zh: '政府对企业（G2B）农业特许经营权、中非企业对企业（B2B）农场联合体与中国农业技术试验示范园区。',
    },
    policyAlignment: {
      en: 'Aligned with AfCFTA Continental Agricultural Transformation Agenda, Nigerian Agricultural Promotion Policy (APP), and FOCAC Green Agriculture Initiative.',
      zh: '紧密衔接非洲大陆自贸区农业转型倡议、尼日利亚农业振兴法案以及中非合作论坛“绿色农业伙伴行动”。',
    },
    actionCommittee: {
      en: 'ACCBCF Agriculture & Food Security Committee',
      zh: '非中企业领袖论坛农业与粮食安全专业委员会',
    },
  },
  {
    id: 'mining',
    slug: 'mining',
    name: { en: 'Mining & Mineral Beneficiation', zh: '矿业开发与矿产深加工' },
    description: {
      en: 'Green mining technologies, local smelting, critical minerals processing (lithium, cobalt, copper), and environmental ESG.',
      zh: '绿色智慧矿山采选、就地冶炼深加工、新能源关键矿产（锂、钴、铜）开发与高标准ESG治理。',
    },
    details: {
      en: 'Moving from raw ore export to local value addition. ACCBCF facilitates joint ventures in critical energy transition minerals, mineral smelting complexes, and environmental remediation to guarantee sustainable resource industrialization.',
      zh: '推动非洲矿产开发从单纯原矿出口向属地高附加值加工战略跃升。论坛促成新能源关键矿产综合精炼厂、环保型智能选矿产线及矿区生态修复工程，保障中非战略资源供应链稳定共赢。',
    },
    icon: 'Gem',
    strategicFocus: [
      { en: 'Domestic refining and smelting of critical energy transition minerals (lithium, copper, cobalt, rare earths)', zh: '新能源关键矿产（锂、铜、钴、稀土）属地化精炼与冶炼' },
      { en: 'Local manufacturing of battery precursors and refined alloy billets', zh: '电池级前驱体、碳酸锂及高纯合金圆坯属地制造' },
      { en: 'Eco-friendly closed-circuit flotation and green tailings reprocessing', zh: '环保型闭路循环选矿产线与尾矿固废资源化二次回收' },
      { en: 'Stringent ESG standards, mine worker skilling, and ecological restoration', zh: '执行高标准ESG规范、本地矿业技术工人培训与矿山生态修复' },
    ],
    keyOpportunities: [
      { en: 'Integrated Lithium Sulfate & Hydroxide Smelting Complex (10,000 MT/year)', zh: '年产1万吨电池级硫酸锂及氢氧化锂综合精炼冶炼厂' },
      { en: 'Electrolytic Copper Smelting & Wire Rod Continuous Casting Facility', zh: '高纯电解铜冶炼厂及连续拉丝铜杆制造基地' },
      { en: 'Industrial-Scale Tailing Retreatment & Solar-Powered Mine Electrification', zh: '万吨级绿色环保尾矿资源综合回收与矿山光伏自备微电网' },
      { en: 'Geo-Surveying & Certified Assay Laboratory Infrastructure', zh: '国际认可的矿产地质勘查、储量核定与第三方化验认证实验室' },
    ],
    valueAdditionStrategy: {
      en: 'Mandating that raw unrefined ores be retained in Africa for local processing, generating sovereign royalties, high-skilled industrial jobs, and guaranteed supply of cathode materials.',
      zh: '坚定终结毛矿直接出口旧模式，推动非洲就地提炼高纯金属中间体与正极原料，沉淀丰厚矿产税收并创造高技术就业。',
    },
    bilateralMechanisms: {
      en: 'Sovereign mineral concession pacts, off-take agreement financing, and joint mining investment sub-funds.',
      zh: '主权矿权开采许可（G2B）、长期包销预付融资（Off-take）及中非联合矿业产业基金。',
    },
    policyAlignment: {
      en: 'Aligned with African Minerals Development Centre (AMDC) Africa Mining Vision and bilateral Critical Raw Material Strategic Accords.',
      zh: '严格对接《非洲矿业愿景》（AMV）与中非关键矿产供应链保障双边互惠协定。',
    },
    actionCommittee: {
      en: 'ACCBCF Mining & Metallurgy Committee',
      zh: '非中企业领袖论坛矿业与冶金重工专业委员会',
    },
  },
  {
    id: 'energy',
    slug: 'energy',
    name: { en: 'Energy & Power Infrastructure', zh: '能源开发与电力基础设施' },
    description: {
      en: 'Grid modernizations, utility-scale solar PV, wind power, clean hydro, and microgrid electrification.',
      zh: '国家级输配电网扩容、集中式光伏电站、风力发电、水电站升级改造与离网型分布式微电网。',
    },
    details: {
      en: 'Reliable power is the lifeblood of African industrialization. We facilitate public-private investments in photovoltaic solar farms, hybrid mini-grids for industrial clusters, high-voltage transmission lines, and gas-to-power energy transitions.',
      zh: '充足电力是非洲工业腾飞的核心引擎。ACCBCF重点协调中非资本布局工业园区配套分布式光伏、区域特高压输变电线路及天然气发电项目，有效破解工业制造用电瓶颈。',
    },
    icon: 'Zap',
    strategicFocus: [
      { en: 'Utility-scale photovoltaic (PV) solar farms with Battery Energy Storage Systems (BESS)', zh: '百兆瓦级集中式光伏电站与储能系统（BESS）一体化建设' },
      { en: 'High-voltage regional transmission grids and sub-station automation', zh: '跨区域特高压骨干输电网扩容、智能变电站与防窃电计量改造' },
      { en: 'Industrial cluster microgrids and dedicated captive gas-fired power plants', zh: '重点自贸工业园区专属微电网与天然气分布式自备电厂' },
      { en: 'Hydroelectric turbine refurbishments and clean run-of-river cascades', zh: '老旧水电站水轮发电机组现代化技改与低落差径流式水电' },
    ],
    keyOpportunities: [
      { en: '150MW Utility-Scale Solar PV & 60MWh Storage Independent Power Producer (IPP)', zh: '150MW集中式光伏+60MWh大型储能独立发电商（IPP）特许经营' },
      { en: 'Industrial Free Zone 50MW Captive Natural Gas Turbine Power Plant', zh: '自贸工业园区配套50MW高效天然气轮机分布式供电工程' },
      { en: 'Rural & Agricultural Productive-Use Mini-Grid Rollout (100 Sites)', zh: '覆盖100个农业生产重镇的离网型光储充智慧微电网集群' },
      { en: 'Smart Meter Manufacturing & Grid Automation Assembly Joint Venture', zh: '智能电表属地化组装厂及配电网自动化调度监控系统集成' },
    ],
    valueAdditionStrategy: {
      en: 'Eliminating the chronic electricity deficit across African industrial corridors to slash manufacturing operating expenses by up to 50%.',
      zh: '彻底破解非洲工业制造电荒瓶颈，以可负担的稳定绿电将制造业用能成本大幅压降40%-50%。',
    },
    bilateralMechanisms: {
      en: 'IPP Concessions, Power Purchase Agreements (PPAs) backed by sovereign or multilateral credit wraps, and Chinese green energy EPC+F delivery.',
      zh: '独立发电商特许经营（IPP）、主权及多边担保购电协议（PPA）与中企“工程总承包+融资”（EPC+F）联合出海。',
    },
    policyAlignment: {
      en: 'Aligned with Agenda 2063 Program for Infrastructure Development in Africa (PIDA) and China-Africa Clean Energy Partnership.',
      zh: '紧扣非盟《2063年议程》非洲基础设施发展规划（PIDA）及中非绿色能源伙伴行动倡议。',
    },
    actionCommittee: {
      en: 'ACCBCF Energy & Power Committee',
      zh: '非中企业领袖论坛能源与电力基础设施专业委员会',
    },
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    name: { en: 'Advanced Manufacturing', zh: '先进制造与工业装备' },
    description: {
      en: 'Automotive and EV assembly, industrial equipment, construction materials, and light manufacturing.',
      zh: '整车及新能源汽车SKD/CKD组装、通用工业机械制造、建筑建材与日用消费品轻工业。',
    },
    details: {
      en: 'Accelerating the Made in Africa revolution. ACCBCF coordinates Chinese manufacturing relocation, CKD automotive assembly plants, ceramic tile and cement factories, and industrial equipment fabrication across West African industrial corridors.',
      zh: '加速“非洲制造”战略突破。论坛积极引进中国成熟制造产能，推动汽车整车及零部件组装、高端陶瓷建材、特种钢材及轻工日用品属地化生产线落地，降低对昂贵进口货物的依赖。',
    },
    icon: 'Cpu',
    strategicFocus: [
      { en: 'Automotive and electric two-wheeler / three-wheeler SKD & CKD assembly', zh: '商用车、乘用车及电动两轮/三轮车SKD/CKD属地组装基地' },
      { en: 'Heavy structural steel, rebars, and architectural aluminum extrusion', zh: '建筑重型结构钢、特种螺纹钢与工业铝型材挤压加工' },
      { en: 'Ceramic tiles, sanitary ware, and float glass production factories', zh: '高档陶瓷墙地砖、节水卫浴洁具与浮法建筑玻璃制造厂' },
      { en: 'Household consumables, plastic molding, and light machinery fabrication', zh: '日用轻工消费品、高精度注塑模具与通用机电配套设备' },
    ],
    keyOpportunities: [
      { en: 'Commercial Truck & Bus Assembly Plant with Local Stamping & Welding Corridors', zh: '轻重型卡车与客车属地化冲焊涂总装总集成汽车产业园' },
      { en: 'Float Glass & Architectural Hardware Manufacturing Complex', zh: '大型优质浮法玻璃制造厂及高端门窗五金配件合资工厂' },
      { en: 'Specialty Steel Rolling Mill for Continental Infrastructure Demands', zh: '年产30万吨高强度基建专用特种盘条与螺纹钢连续轧钢厂' },
      { en: 'Industrial Plastic Packaging & Injection Molding Hub', zh: '食品医药级高阻隔塑料包装与精密注塑注拉吹成型生产基地' },
    ],
    valueAdditionStrategy: {
      en: 'Replacing high-cost imports with local African assembly, establishing supplier ecosystems, and skilling thousands of domestic technicians.',
      zh: '以本土化总装替代高成本外汇进口，培育非洲属地零部件配套产业链，造就大批高素质技术工人。',
    },
    bilateralMechanisms: {
      en: 'Joint ventures between Chinese manufacturing conglomerates and African industrialists, tariff-protected domestic assembly quotas.',
      zh: '中国制造业龙头与非洲实力工商业领袖合资合作，享受自贸区原产地关税保护与装备进口免税。',
    },
    policyAlignment: {
      en: 'Aligned with Accelerated Industrial Development for Africa (AIDA) and the National Industrial Revolution Plans of West Africa.',
      zh: '契合非盟《非洲工业化加速发展倡议》（AIDA）及西非各国国家工业革命总体规划。',
    },
    actionCommittee: {
      en: 'ACCBCF Advanced Manufacturing Committee',
      zh: '非中企业领袖论坛装备制造与工业产业专业委员会',
    },
  },
  {
    id: 'infrastructure',
    slug: 'infrastructure',
    name: { en: 'Transportation & Logistics Infrastructure', zh: '交通运输与港口物流' },
    description: {
      en: 'Deep-sea ports, standard-gauge railways, highway corridors, inland dry ports, and airport upgrades.',
      zh: '现代化深水海港、标准轨客货干线铁路、跨国互联公路走廊、内陆无水港与枢纽机场扩建。',
    },
    details: {
      en: 'Connecting Africa internally and to global maritime lanes. We mobilize engineering and funding consortiums to deliver multi-modal transport arteries, port automation, and cross-border highway corridors aligned with the African Continental Free Trade Area (AfCFTA).',
      zh: '畅通非洲大陆内部循环与全球海上丝绸之路。论坛协助大型基建工程集团联合金融机构，承揽国际航运集装箱码头、铁路干线集疏运系统及AfCFTA跨国贸易通道建设。',
    },
    icon: 'TrainTrack',
    strategicFocus: [
      { en: 'Deep-sea container port automation, berths, and breakwater expansion', zh: '深水自动化集装箱码头、专用散货泊位与外防波堤扩建工程' },
      { en: 'Standard-gauge heavy-haul railways and dry-port intermodal links', zh: '标准轨重载铁路干线、集装箱无水内陆港与多式联运转运场站' },
      { en: 'Cross-border highway trade corridors and toll bridge concessions', zh: '跨国高等级贸易互联公路走廊、特大跨江桥梁与收费公路特许权' },
      { en: 'Regional cargo airport hubs, apron expansions, and cold storage facilities', zh: '区域性航空货运枢纽机场扩建、宽体货机停机坪与机坪恒温库' },
    ],
    keyOpportunities: [
      { en: 'Deep-Sea Port Phase-II Container Terminal Expansion & Automated Crane Fleet', zh: '枢纽深水港二期集装箱泊位扩建与自动化岸桥机队成套工程' },
      { en: '120km Industrial Mineral Railway Line Connecting Mines to Coastal Export Port', zh: '120公里关键矿区直达沿海出海口重载专用铁路线特许建设运营' },
      { en: 'Cross-Border AfCFTA Dry Port Hub & Customs Inspection Modernization', zh: '跨国自贸区无水港内陆集散中心与智慧海关查验通关走廊' },
      { en: 'Air Cargo Logistics Base & Aircraft Maintenance, Repair, and Overhaul (MRO)', zh: '国际货运航空冷链枢纽中心与支线客货机MRO维保定检基地' },
    ],
    valueAdditionStrategy: {
      en: 'Unblocking continental logistical bottlenecks to lower inter-African transport transit times by 60% and support AfCFTA market velocity.',
      zh: '彻底畅通非洲大陆海铁联运物流瓶颈，将跨境物流在途时间大幅压缩60%，激活非洲自贸区大市场流通活力。',
    },
    bilateralMechanisms: {
      en: 'Public-Private Partnerships (PPP), Built-Operate-Transfer (BOT) concessions, and sovereign credit facility syndication.',
      zh: 'PPP公私合营架构、BOT特许建设运营移交模式及主权信用商业联合银团贷款。',
    },
    policyAlignment: {
      en: 'Aligned with AU Agenda 2063 Flagship Projects (Integrated High Speed Train Network, Single African Air Transport Market).',
      zh: '全面契合非盟《2063议程》旗舰工程：非洲一体化干线铁路网与非洲单一航空运输市场（SAATM）。' },
    actionCommittee: {
      en: 'ACCBCF Engineering & Infrastructure Committee',
      zh: '非中企业领袖论坛工程建设与基建专业委员会',
    },
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: { en: 'Healthcare & Pharmaceuticals', zh: '医药健康与医疗装备' },
    description: {
      en: 'Local pharmaceutical formulation, diagnostic medical equipment, specialty hospitals, and digital health.',
      zh: '基本药物与抗生素本地制药厂、大型医学影像诊断设备、专科医院投资与数字远程诊疗。',
    },
    details: {
      en: 'Strengthening continental health security. ACCBCF supports local manufacturing of WHO-prequalified generic medications, infusion lines, vaccine production partnerships, and diagnostic imaging centers.',
      zh: '筑牢非洲公共卫生安全防线。论坛主推本土化输液与基础药品制剂工厂、一次性医疗耗材生产基地、现代中医院及远程AI辅助诊断网络，全面改善基层就医可及性。',
    },
    icon: 'HeartPulse',
    strategicFocus: [
      { en: 'Local formulation of WHO-prequalified generic medications and antibiotics', zh: '通过WHO预认证的广谱抗生素与基础口服固体制剂本地化制药厂' },
      { en: 'Large-volume intravenous (IV) infusion fluids and disposable consumables', zh: '大容量注射剂（IV输液袋）与高分子一次性医疗耗材无菌车间' },
      { en: 'Specialty cancer centers, cardiology suites, and multi-disciplinary hospitals', zh: '现代化综合专科诊疗中心、心血管及肿瘤微创手术室医疗联合体' },
      { en: 'Telemedicine, AI-assisted radiology screening, and cold-chain vaccine delivery', zh: '数字远程诊疗平台、AI医学影像辅助筛查与医用冷链疫苗储运' },
    ],
    keyOpportunities: [
      { en: 'Intravenous (IV) Infusion Fluid Production Plant (30 Million Bottles/Year)', zh: '年产3000万瓶非PVC软袋无菌医用大输液现代化生产基地' },
      { en: 'Essential Oral Solid Dosage Generic Drug Manufacturing Facility', zh: '年产10亿片/粒国家基本药物口服固体制剂GMP标准药厂' },
      { en: 'Tertiary Medical Diagnostics Imaging Center with MRI & CT Suites', zh: '高等级医学影像中心（配备1.5T MRI、超高端CT与数字化DR）' },
      { en: 'Digital Telehealth & Rural Diagnostics Clinic Distribution Network', zh: '覆盖广大农村与边远城镇的便携式智慧化远程会诊与急救诊疗方舱' },
    ],
    valueAdditionStrategy: {
      en: 'Overcoming Africa 90% dependence on imported pharmaceuticals, anchoring continental health sovereignty and emergency self-reliance.',
      zh: '扭转非洲90%药品依赖海外昂贵进口的不利局面，筑牢主权卫生安全底线，实现基础用药自给自足。',
    },
    bilateralMechanisms: {
      en: 'Bilateral healthcare partnerships, Chinese pharmaceutical technology licensing, and sovereign public health procurement pacts.',
      zh: '政府间卫生健康合作协议、中国品牌药企技术转移许可与主权医疗集中采购长协。',
    },
    policyAlignment: {
      en: 'Aligned with African Union Pharmaceutical Manufacturing Plan for Africa (PMPA) and Africa CDC Continental Health Security framework.',
      zh: '严格对齐非盟《非洲药品制造计划》（PMPA）与非洲疾控中心公共卫生韧性纲要。',
    },
    actionCommittee: {
      en: 'ACCBCF Medical & Healthcare Committee',
      zh: '非中企业领袖论坛医药健康与生命科学专业委员会',
    },
  },
  {
    id: 'financial',
    slug: 'financial-services',
    name: { en: 'Financial Services & Capital Markets', zh: '金融服务与资本市场' },
    description: {
      en: 'Cross-border RMB settlement, local currency swaps, trade finance instruments, and private equity syndication.',
      zh: '跨境人民币结算试点、央行本币互换应用、信用证与供应链金融工具、产业私募基金联合投资。',
    },
    details: {
      en: 'Providing the financial plumbing for Africa-China commerce. We facilitate interbank relationships, trade settlement mechanisms, insurance de-risking, and equity co-investment funds focused on African growth enterprises.',
      zh: '搭建非中经贸金融基础设施。论坛致力于推动商业银行代理行关系建立、大宗贸易人民币直接计价结算、海外投资政治与主权风险联合承保，打造投融资闭环生态。',
    },
    icon: 'Landmark',
    strategicFocus: [
      { en: 'Cross-border bilateral Renminbi (RMB) settlement and local currency swaps', zh: '跨境人民币（RMB）直接结算试点与央行间双边本币互换应用' },
      { en: 'Letters of Credit (LC), structured trade finance, and factoring facilities', zh: '跨境信用证保兑、大宗进出口贸易融资与应收账款国际保理' },
      { en: 'Private equity co-investment funds focused on African industrial projects', zh: '专注非洲实体工业与能源基建的中非联合产业股权直投基金' },
      { en: 'Export credit insurance, political risk guarantees, and sovereign credit wrapping', zh: '海外投资政治风险联合再保险、国家信用担保与项目去风险工具' },
    ],
    keyOpportunities: [
      { en: 'China-Africa Cross-Border Trade RMB/Naira Clearing & Liquidity Window', zh: '中非大宗商品双向结算人民币/本币清算直通窗口与流动性支持' },
      { en: 'Bilateral Industrial Development Fund for SEZ Infrastructure Financing', zh: '首期规模3亿美元的中非自贸特区工业园区建设专项母基金' },
      { en: 'Export-Import Equipment Leasing & Supplier Credit Consortium', zh: '重大工程装备直租与跨境分期采购中非联合供应链租赁公司' },
      { en: 'Digital Trade Finance & Smart LC Blockchain Settlement Gateway', zh: '基于智能合约的跨国大宗贸易区块链信用证与供应链金融平台' },
    ],
    valueAdditionStrategy: {
      en: 'De-dollarizing bilateral commerce to lower exchange fees by 5-8%, insulating African enterprises from FX volatility, and mobilizing patient capital.',
      zh: '降低双边贸易对第三方货币依赖，规避汇率剧烈波动损耗5%-8%，为优质工业项目提供低成本耐心资本。',
    },
    bilateralMechanisms: {
      en: 'Central bank bilateral swap implementation, commercial bank correspondent networks, and development finance syndication.',
      zh: '央行双边本币互换落地细化、骨干商业银行代理行网络搭建及多边开发金融机构联合授信。',
    },
    policyAlignment: {
      en: 'Aligned with AfCFTA Pan-African Payment and Settlement System (PAPSS) and FOCAC Financial Connectivity Priority.',
      zh: '紧密契合泛非支付结算系统（PAPSS）及中非合作论坛“金融互联互通”重点支持清单。',
    },
    actionCommittee: {
      en: 'ACCBCF Banking, Finance & Investment Committee',
      zh: '非中企业领袖论坛金融投资与资本市场专业委员会',
    },
  },
  {
    id: 'digital',
    slug: 'digital-economy',
    name: { en: 'Digital Economy & Tech Innovation', zh: '数字经济与前沿科技' },
    description: {
      en: '5G fiber networks, Tier-3 green data centers, fintech payment gateways, and enterprise cloud solutions.',
      zh: '5G基站与骨干光缆网、绿色节能数据中心、移动微支付清算网关与智慧政务云平台。',
    },
    details: {
      en: 'Powering Africa leapfrog digital transformation. We match Chinese tech innovators in telecommunications, AI, cloud computing, and fintech with African telecommunications operators and financial institutions.',
      zh: '赋能非洲数字化跨越式发展。对接中方前沿5G通信方案、模块化云计算中心建设方案及成熟移动支付系统，赋能非洲各行业实现无缝数字化升级。',
    },
    icon: 'Radio',
    strategicFocus: [
      { en: 'National fiber backbone rollout, metropolitan FTTH, and 4G/5G mobile towers', zh: '国家级骨干光缆网、都市千兆光纤入户与4G/5G通信基站规模覆盖' },
      { en: 'Tier-3 and Tier-4 green modular data centers and hyperscale cloud facilities', zh: '符合国际Tier-3标准的模块化绿色节能数据中心与超算云平台' },
      { en: 'Fintech mobile payment switches, cross-border digital wallets, and QR clearing', zh: '移动微支付核心交换网关、跨国数字钱包与商户聚合扫码清算' },
      { en: 'E-government digital public services, smart customs, and enterprise SaaS solutions', zh: '数字化智慧政务云底座、智慧口岸电子通关系统与企业级SaaS' },
    ],
    keyOpportunities: [
      { en: 'Tier-3 Certified Hyperscale Green Data Center (1,500 Racks) in Abuja', zh: '位于尼日利亚阿布贾的高可用国际Tier-3标准绿色数据中心（1500机柜）' },
      { en: 'Cross-Border Mobile Money Interoperability & Remittance Gateway', zh: '中非跨境小额即时汇款与移动电子钱包互联互通网关' },
      { en: 'National E-Government Integrated Service Cloud & Biometric Citizen ID', zh: '国家级电子政务统一集约化数字政务云平台与生物识别数字身份' },
      { en: 'Smart Customs Electronic Single Window for Port & Border Terminals', zh: '港口及陆路口岸国际贸易“单一窗口”智能验放与集装箱追踪系统' },
    ],
    valueAdditionStrategy: {
      en: 'Enabling African economies to leapfrog legacy infrastructure, cutting administrative costs by 40% and creating digital jobs for young demographics.',
      zh: '赋能非洲经济实现跨越式数字化跃升，大幅压降40%行政与商业交易成本，释放青年人口数字红利。',
    },
    bilateralMechanisms: {
      en: 'Government digital concessions, technology licensing and transfer, and enterprise joint ventures.',
      zh: '政府数字化特许运营（BOT/BOO）、前沿科技知识产权授权及中非科技独角兽联合孵化。',
    },
    policyAlignment: {
      en: 'Aligned with African Union Digital Transformation Strategy for Africa (2020-2030) and FOCAC Digital Innovation Partnership.',
      zh: '全面对接非盟《非洲数字化转型战略（2020-2030）》及中非“数字创新伙伴行动”。',
    },
    actionCommittee: {
      en: 'ACCBCF Digital Economy & Telecommunications Committee',
      zh: '非中企业领袖论坛数字经济与前沿科技专业委员会',
    },
  },
  {
    id: 'logistics',
    slug: 'logistics',
    name: { en: 'Modern Logistics & Supply Chain', zh: '现代物流与智能供应链' },
    description: {
      en: 'Cold-chain storage hubs, bonded logistics parks, air cargo corridors, and maritime shipping lines.',
      zh: '国际温控冷链储运基地、保税物流中心、直航全货运包机航线与跨国多式联运。',
    },
    details: {
      en: 'Ensuring seamless movement of goods between China and African consumer markets. ACCBCF facilitates investments in temperature-controlled logistics for perishable agricultural goods and automated bonded warehouses.',
      zh: '打通非中跨境货运大动脉。推进高标准恒温保税库、自动化分拣中转仓及港口集装箱智慧调度网络，显著压降非洲内陆各节点综合物流成本。',
    },
    icon: 'Truck',
    strategicFocus: [
      { en: 'Bonded logistics zones, automated sorting hubs, and export consolidation yards', zh: '海关保税物流园区、自动化智慧分拣分拨中心与出口拼箱集散场' },
      { en: 'Temperature-controlled reefer storage chains for pharmaceuticals and perishables', zh: '覆盖医药制剂与鲜活农产品的多温区恒温冷库与冷藏运输车队' },
      { en: 'Intermodal freight scheduling linking sea ports to landlocked hinterlands', zh: '连通沿海深水海港与内陆腹地各国的公铁水多式联运智能调度' },
      { en: 'Direct air cargo charters and ocean carrier slot-sharing agreements', zh: '中非直达全货机定期货运包机与远洋航运骨干船队舱位共享' },
    ],
    keyOpportunities: [
      { en: 'Cold Chain Agro-Logistics Center (20,000 MT Capacity) at Lagos Gateway', zh: '拉各斯出海口枢纽2万吨级现代化农产品国际多温区温控储运中心' },
      { en: 'Inland Bonded Dry Port Logistics Terminal with Direct Rail Siding', zh: '连通货运铁路专用线的国家级内陆海关保税分拨无水港枢纽' },
      { en: 'Dedicated Air Cargo Corridor with Scheduled Freight Charters (China-Nigeria)', zh: '中国（广州/郑州/义乌）至西非（阿布贾/拉各斯）定期货运直航航线' },
      { en: 'Automated Container Depot & Real-Time GPS Fleet Tracking Network', zh: '港区自动化空箱周转堆场与跨国运输车队北斗/GPS全天候追踪指挥网络' },
    ],
    valueAdditionStrategy: {
      en: 'Halving cargo dwell times from 18 days to 5 days, compressing supply chain turnaround, and ensuring zero perishable spoilage across transport legs.',
      zh: '将港口与转运节点货物平均滞留时间从18天缩短至5天内，消除鲜活物资在途损耗，加速贸易周转。',
    },
    bilateralMechanisms: {
      en: 'Bonded zone concessions, logistics joint ventures between Chinese freight forwarders and African transporters.',
      zh: '海关保税仓储特许经营、中资国际货代航运巨头与非洲属地物流运输车队联合运营。',
    },
    policyAlignment: {
      en: 'Aligned with AfCFTA Trade Facilitation Agreement and Belt and Road Maritime Logistics Network.',
      zh: '紧密衔接非洲自贸区贸易便利化协定与共建“一带一路”跨国海上物流网络。',
    },
    actionCommittee: {
      en: 'ACCBCF Logistics & Supply Chain Committee',
      zh: '非中企业领袖论坛现代物流与智能供应链专业委员会',
    },
  },
  {
    id: 'parks',
    slug: 'industrial-parks',
    name: { en: 'Industrial Parks & Free Trade Zones', zh: '产业园区与自贸特区' },
    description: {
      en: 'Integrated SEZ master-planning, one-stop administrative clearances, plug-and-play utilities, and tenant recruitment.',
      zh: '综合性经济特区总体规划、一站式海关政务联办、现成水电气配套保障与中企组团入园招商。',
    },
    details: {
      en: 'Providing secure, state-of-the-art homes for international manufacturers. We partner with African governments and Chinese industrial developers to construct and populate specialized export processing zones and free ports.',
      zh: '为出海工业企业打造高标准安全生产家园。论坛与多国投资促进局联手规划开发轻纺、汽配、医药等特色工业园，实现“拎包入驻”、政策直达与产业集聚集群效应。',
    },
    icon: 'Building',
    strategicFocus: [
      { en: 'Integrated Special Economic Zone (SEZ) master-planning and modern infrastructure', zh: '大型综合性特别经济区（SEZ）顶层规划与高品质“九通一平”基建' },
      { en: 'One-stop governmental approvals (customs, immigration, tax, business registry)', zh: '园区“一站式”政务服务中心（海关免税查验、工作签、商事登记）' },
      { en: 'Dedicated uninterrupted utilities (gas-to-power, clean water, optical fiber)', zh: '工业园自备不间断独立电站、工业高压自来水厂与双回路千兆光纤' },
      { en: 'Targeted tenant recruitment of Chinese export manufacturing consortiums', zh: '瞄准中国成熟出海产业带的组团招商、轻纺机电特色园群招商' },
    ],
    keyOpportunities: [
      { en: 'Federal Free Trade Zone Light Manufacturing Phase-I (500 Hectares)', zh: '500公顷国家级自贸区轻工业示范先导园（厂房标准化建设+定制开发）' },
      { en: 'Automotive & Heavy Equipment Industrial Cluster Zone', zh: '整车总装、工程机械及底盘零配件制造特色免税产业园区' },
      { en: 'Agro-Allied Export Processing Zone with On-Site Quality Labs', zh: '现代农产品精深加工出口自贸区（配备原产地动植物检疫国家级实验室）' },
      { en: 'Plug-and-Play Standard Factory Units for Small & Medium Enterprises', zh: '面向中小制造企业的“拎包入驻”标准化工业厂房及员工生活配套社区' },
    ],
    valueAdditionStrategy: {
      en: 'Providing a ring-fenced, safe, and policy-stable sanctuary where manufacturers operate with zero grid downtime and duty-free raw material imports.',
      zh: '打造封闭式、安全稳定与法治可预期的特区绿洲，实现零停电自备用能与原料设备免税进出。',
    },
    bilateralMechanisms: {
      en: 'G2G bilateral park cooperation, master developer concessions, and joint government steering committees.',
      zh: '政府对政府（G2G）双边共建园区协议、园区一级土地综合开发特许权与部长级指导委员会。',
    },
    policyAlignment: {
      en: 'Aligned with national NEPZA (Nigeria Export Processing Zones Authority) statutes, AfCFTA Rules of Origin, and FOCAC Capacity Cooperation Parks.',
      zh: '依托尼日利亚国家出口加工区管理局（NEPZA）免税政策、自贸区原产地规则及中非产能合作示范区。',
    },
    actionCommittee: {
      en: 'ACCBCF Industrial Parks & Free Trade Zones Committee',
      zh: '非中企业领袖论坛产业园区与自贸特区专业委员会',
    },
  },
  {
    id: 'green',
    slug: 'green-economy',
    name: { en: 'Green Economy & Ecological Protection', zh: '绿色低碳与循环经济' },
    description: {
      en: 'Carbon credit monetization, circular waste recycling, electric mobility ecosystems, and reforestation.',
      zh: '国际碳汇交易与认证、固体废物资源化再利用、轻型电动化交通网络与生态防护林工程。',
    },
    details: {
      en: 'Ensuring industrialization respects ecological boundaries. ACCBCF structures climate finance initiatives, verified carbon credit programs, e-mobility (two-wheeler and bus) manufacturing, and industrial wastewater recycling plants.',
      zh: '引领绿色可持续工业化潮流。积极对接全球绿色气候基金，推进非洲林业碳汇开发、城市新能源两轮/四轮电动交通替代工程及工业废渣废水绿色闭环利用。',
    },
    icon: 'Leaf',
    strategicFocus: [
      { en: 'Internationally certified carbon credit (VER/CER) generation and trading', zh: '国际认可的高质量自愿碳减排指标（VER）核查认证与跨境碳汇交易' },
      { en: 'Electric two-wheeler and electric public bus ecosystem deployment', zh: '城市轻型电动两轮车、电动三轮车与纯电动公交车充换电生态布局' },
      { en: 'Industrial solid waste recycling, e-waste recovery, and circular plastics', zh: '工业冶炼固废无害化综合利用、电子废弃物金属提纯与废塑料再生循环' },
      { en: 'Reforestation, desertification control, and watershed ecological protection', zh: '跨国“绿色长城”荒漠化生态屏障工程、水源地保护与水土涵养林建设' },
    ],
    keyOpportunities: [
      { en: 'Continental Mangrove & Forestry Carbon Offset Development (500,000 Hectares)', zh: '50万公顷沿海红树林与热带森林高价值碳汇联合开发与国际变现' },
      { en: 'Urban Electric Two-Wheeler Assembly & Battery Swapping Station Grid (1,000 Stations)', zh: '城市轻型电动摩托车总装线及1000座智能锂电换电柜网络运营' },
      { en: 'Industrial Wastewater Closed-Loop Treatment & Sludge Recovery Facility', zh: '重工业集聚区高浓度工业废水零排放闭环处理与中水回用示范工程' },
      { en: 'E-Waste Metallurgical Recovery & Certified Hazardous Material Disposal', zh: '年处理5万吨报废电子产品贵金属湿法提炼与无害化危废处置合资企业' },
    ],
    valueAdditionStrategy: {
      en: 'Transforming environmental stewardship into a major source of hard currency through international carbon monetization and clean-tech manufacturing.',
      zh: '将生态环境保护转化为实打实的硬通货收入，通过碳汇资产化与本土新能源制造实现绿水青山变金山银山。',
    },
    bilateralMechanisms: {
      en: 'Article 6 carbon credit bilateral agreements, sovereign green bond syndication, and clean-tech joint ventures.',
      zh: '巴黎协定第六条框架下主权碳信用双边转让、绿色主权债券联合发行与中非环保合资公司。',
    },
    policyAlignment: {
      en: 'Aligned with African Great Green Wall Initiative, Nationally Determined Contributions (NDCs), and FOCAC Green Development Action.',
      zh: '对接非洲“绿色长城”宏大倡议、各国应对气候变化自主贡献目标（NDC）与中非绿色发展行动计划。',
    },
    actionCommittee: {
      en: 'ACCBCF Green Economy & Climate Action Committee',
      zh: '非中企业领袖论坛绿色低碳与气候应对专业委员会',
    },
  },
  {
    id: 'smart-cities',
    slug: 'smart-cities',
    name: { en: 'Smart Cities & Urban Planning', zh: '智慧城市与新型城镇化' },
    description: {
      en: 'Intelligent traffic surveillance, smart water meters, urban GIS mapping, and sustainable master developments.',
      zh: '城市智能交通诱导调度、水电气智慧计量网络、市政三维地理信息系统（GIS）与综合新城开发。',
    },
    details: {
      en: 'Designing resilient urban environments for Africa rapidly expanding metropolitan centers. We connect African capital cities with Chinese urban planners, smart municipal technologies, and clean energy mass transit.',
      zh: '提升非洲主要城市治理现代化水平。协助阿布贾、拉各斯、内罗毕等核心都市引入智能信号灯控制、公共安全应急联动指挥平台及生态低碳商业新城区整体建设规划。',
    },
    icon: 'Compass',
    strategicFocus: [
      { en: 'Adaptive intelligent traffic signal surveillance and metropolitan congestion alleviation', zh: '自适应智能交通信号联动监控、潮汐车道调度与大都市拥堵治理' },
      { en: 'Automated smart water and municipal electric metering networks', zh: '市政智能超声波水表、远传电表物联网采集与供水管网防漏测绘' },
      { en: 'Urban Geographic Information Systems (GIS) and 3D digital-twin master planning', zh: '城市综合高精地理信息系统（GIS）、数字孪生三维实景与新型新城总规' },
      { en: 'Integrated emergency response command centers and municipal public safety', zh: '城市应急联动指挥综合调度中心、市政公共安全网格化智慧感知平台' },
    ],
    keyOpportunities: [
      { en: 'Metropolitan Intelligent Traffic Management System (ITMS) Concession in Abuja', zh: '尼日利亚联邦首都区阿布贾大都市区智能交通指挥控制系统特许运营' },
      { en: 'City-Wide Smart Water Metering AMR/AMI Network Rollout (200,000 Units)', zh: '20万户全覆盖的城市供水管网智能抄表系统与远程产销差管理' },
      { en: 'Digital-Twin Urban GIS Cadastral Mapping & Municipal Asset Registry', zh: '核心城市三维数字孪生地籍空间测绘与市政不动产精准数字化建档' },
      { en: 'Integrated Public Safety Emergency Response Center & Video Surveillance', zh: '多部门一体化公共安全应急协同指挥中心大厅与高清智能感知网' },
    ],
    valueAdditionStrategy: {
      en: 'Modernizing metropolitan administration to prevent urban decay, saving hundreds of millions in transit delays, and ensuring safety for global investors.',
      zh: '全面推进非洲超大城市治理能力现代化，每年为社会节约数亿美元通行拥堵成本，为外资安居乐业保驾护航。',
    },
    bilateralMechanisms: {
      en: 'Municipal G2B concession agreements, sovereign concessional IT loans, and technology co-development with Chinese smart city giants.',
      zh: '市政公用基础设施特许经营（G2B）、主权优贷支持与中国领军智慧城市方案商联合开发落地。',
    },
    policyAlignment: {
      en: 'Aligned with UN Sustainable Development Goal 11 (Sustainable Cities and Communities) and AU New Urban Agenda.',
      zh: '紧扣联合国可持续发展目标11（可持续城市与社区）及非盟《新城市议程》战略行动方案。',
    },
    actionCommittee: {
      en: 'ACCBCF Smart Cities & Urban Modernization Committee',
      zh: '非中企业领袖论坛智慧城市与城镇化建设专业委员会',
    },
  },
];

export const PRIORITY_SECTORS: SectorItem[] = localized(RAW_PRIORITY_SECTORS) as unknown as SectorItem[];

const RAW_GOVERNANCE_TIERS = [
  {
    id: 'board',
    name: { en: 'Board of Directors', zh: '董事会' },
    description: {
      en: 'Highest governing authority responsible for strategic direction, statutory oversight, and long-term organizational stewardship.',
      zh: '最高决策权力机构，负责统揽战略方向、法定监督管理及论坛长期愿景规划。',
    },
    level: 1,
  },
  {
    id: 'stakeholders',
    name: { en: 'Stakeholders Leadership Committee', zh: '利益相关方领袖委员会' },
    description: {
      en: 'Comprising distinguished African and Chinese enterprise chairmen, chamber presidents, and institutional partners who shape bilateral agendas.',
      zh: '由非中知名企业家领袖、国家级商会会长及重要机构合作伙伴组成，引领双边议题。',
    },
    level: 2,
  },
  {
    id: 'advisory',
    name: { en: 'Senior Advisory Committee', zh: '高级顾问委员会' },
    description: {
      en: 'Eminent former diplomats, economists, legal scholars, and industry veterans providing non-executive guidance on geopolitical and macroeconomic trends.',
      zh: '由资深前外交官、宏观经济学家、法学泰斗及行业权威人士组成，提供地缘政治与宏观战略前瞻指导。',
    },
    level: 3,
  },
  {
    id: 'executive',
    name: { en: 'Executive Management Committee', zh: '执行管理委员会' },
    description: {
      en: 'Operational leadership team supervising day-to-day secretariat management, program execution, and departmental alignment.',
      zh: '负责日常行政与业务推进的核心管理团队，统筹督导秘书处运转、项目落地与跨部门协作。',
    },
    level: 4,
  },
  {
    id: 'secretariat',
    name: { en: 'Secretariat & Operational Departments', zh: '常设秘书处与各职能部门' },
    description: {
      en: 'The professional administrative engine executing forum initiatives across 5 specialized divisions.',
      zh: '论坛常设专业执行机构，通过五大专业部门全面推动论坛各项决议落地实施。',
    },
    level: 5,
    items: [
      {
        name: { en: 'International Cooperation Department', zh: '国际合作部' },
        description: {
          en: 'Bilateral government liaisons, multilateral protocols, and sovereign project coordination.',
          zh: '统筹多双边政府外交事务衔接、涉外合作协议起草及主权级经贸项目协调。',
        },
      },
      {
        name: { en: 'International Liaison Department', zh: '国际联络部' },
        description: {
          en: 'Chamber alliances, diplomatic missions, VIP delegation management, and continental membership.',
          zh: '对接全球各大商协会、驻华及驻非使领馆，统筹高端商务考察团及各大会员事务。',
        },
      },
      {
        name: { en: 'Trade & Investment Dept / International Media Center', zh: '经贸投资部 / 国际传媒中心' },
        description: {
          en: 'Direct investment landing, business matching, and global multilingual institutional media dissemination.',
          zh: '承接投资促进落地与商业撮合，协同运营国际全媒体矩阵进行官方权威发布。',
        },
      },
      {
        name: { en: 'China–Africa Business Mediation Center', zh: '中非商事调解中心' },
        description: {
          en: 'Independent commercial dispute mediation, legal risk mitigation, and intellectual property protection.',
          zh: '提供独立公允的涉外商事争端预防与调解、涉外法务合规咨询及海外权益救济。',
        },
      },
      {
        name: { en: 'Branding & Communications Center', zh: '品牌传播中心' },
        description: {
          en: 'Brand identity protection, corporate publishing, official summit staging, and public diplomacy.',
          zh: '维护论坛视觉形象与国际公信力，策划承办高级别旗舰年会及系列公关活动。',
        },
      },
    ],
  },
  {
    id: 'committees',
    name: { en: 'Industry Professional Committees', zh: '各行业专业委员会' },
    description: {
      en: 'Specialized sectoral councils driving practical industrial partnerships, technical standards, and joint ventures.',
      zh: '聚焦重点实体赛道设立的行业专门机构，负责深耕各细分行业务实合作与技术对接。',
    },
    level: 6,
    items: [
      { name: { en: 'Agriculture Committee', zh: '农业专业委员会' } },
      { name: { en: 'Mining Committee', zh: '矿业专业委员会' } },
      { name: { en: 'Energy Committee', zh: '能源专业委员会' } },
      { name: { en: 'Engineering Committee', zh: '工程建设专业委员会' } },
      { name: { en: 'Manufacturing Committee', zh: '装备制造专业委员会' } },
      { name: { en: 'Medical Committee', zh: '医药医疗专业委员会' } },
      { name: { en: 'Finance Committee', zh: '金融投资专业委员会' } },
    ],
  },
];

export const GOVERNANCE_TIERS: GovernanceTier[] = localized(RAW_GOVERNANCE_TIERS) as unknown as GovernanceTier[];

const RAW_SAMPLE_NEWS = [
  {
    id: 'inauguration-abuja-2026',
    slug: 'inauguration-of-accbcf-in-abuja',
    title: {
      en: 'Inauguration of Africa China Chairmen of Business Forum (ACCBCF) in Abuja Sets New Milestone in Bilateral Economic Cooperation',
      zh: '非中企业领袖论坛（ACCBCF）在尼日利亚阿布贾正式成立 开启中非经贸合作崭新篇章',
    },
    category: { en: 'Institutional News', zh: '论坛动态' },
    date: '2026-03-30',
    author: 'ACCBCF Secretariat',
    readTime: { en: '4 min read', zh: '阅读约 4 分钟' },
    image: '/images/forum/fmiti-headquarters-handshake.jpg',
    excerpt: {
      en: 'On 30 March 2026, ministerial leaders, African business chairmen, and Chinese conglomerate representatives gathered at the Federal Secretariat in Abuja to formally inaugurate the Africa China Chairmen of Business Forum.',
      zh: '2026年3月30日，来自非洲多国的主权部长、著名商业领袖与中资骨干企业负责人齐聚尼日利亚联邦首都区阿布贾联邦秘书处，共同见证非中企业领袖论坛正式启幕。',
    },
    content: {
      en: 'The Africa China Chairmen of Business Forum (ACCBCF) was formally established on 30 March 2026 in Abuja, the Federal Capital Territory of Nigeria. Headquartered within the Federal Ministry of Industry, Trade and Investment complex, the Forum serves as a strategic institutional bridge linking African and Chinese governments, enterprise leadership, and institutional capital.\n\nDuring the inaugural ceremony, leaders underscored the Forum guiding principles: Government Guidance, Chamber Collaboration, Enterprise Leadership, Market Orientation, and Win-Win Cooperation. The Forum will operationalize four strategic cooperation models: Government to Government (G2G), Government to Business (G2B), Business to Business (B2B), and Business to Capital (B2C).\n\nRepresentatives highlighted key priority sectors for immediate bilateral action, notably modern agro-processing, critical minerals value addition, and distributed renewable energy infrastructure. The newly established Secretariat reaffirmed its commitment to providing institutional-grade project facilitation, legal compliance safeguards, and cross-border financial matchmaking.',
      zh: '2026年3月30日，非中企业领袖论坛（ACCBCF）在尼日利亚联邦首都区阿布贾宣告正式成立。论坛总部设立于阿布贾旧联邦秘书处联邦工业、贸易和投资部大院内，致力于成为连接非洲与中国各级政府、领军企业与金融资本的高能级制度化桥梁。\n\n成立大会上，与会领导和专家一致强调了论坛恪守的五项基本原则：“政府引导、商会协同、企业主体、市场运作、合作共赢”。论坛确立了以“政府对政府（G2G）、政府对企业（G2B）、企业对企业（B2B）、企业对资本（B2C）”为核心的四大战略合作架构。\n\n论坛将围绕农业与农产品加工、矿业与关键矿产深加工、可再生能源与电力基础设施等十二大核心领域全面发力。常设秘书处重申，将持续为广大会员与合作伙伴提供制度化项目落地保障、中非商事调解合规支持与全生命周期跨境金融服务。',
    },
  },
  {
    id: 'g2g-dialogue-industrialization',
    slug: 'strategic-g2g-dialogue-industrialization-west-africa',
    title: {
      en: 'Strategic G2G Dialogue Explores Industrial Park Concessions and Supply Chain Integration in West Africa',
      zh: '战略级G2G高端对话会召开：聚焦西非自贸特区特许经营与产业链深度融合',
    },
    category: { en: 'Strategic Dialogue', zh: '战略合作' },
    date: '2026-04-18',
    author: 'International Cooperation Dept',
    readTime: { en: '5 min read', zh: '阅读约 5 分钟' },
    image: '/images/forum/executive-boardroom-session.jpg',
    excerpt: {
      en: 'High-level delegations engaged in closed-door sessions to structure concessionary frameworks, Special Economic Zone tax exemptions, and streamlined customs clearance.',
      zh: '高级别政企代表团举行闭门专题会，就经济特区税收减免政策、绿色清关通道与工业园特许经营权转让展开深入研讨。',
    },
    content: {
      en: 'Under the auspices of the ACCBCF International Cooperation Department, a multilateral ministerial roundtable brought together trade representatives and leading Chinese industrial park developers. The dialogue centered on establishing standardized concession models that protect sovereign interests while offering long-term policy certainty to industrial tenants.\n\nDiscussions addressed the harmonization of customs procedures under the African Continental Free Trade Area (AfCFTA) framework, local currency liquidity mechanisms, and dedicated power tariffs for manufacturing zones. Three bilateral project pre-feasibility agreements were signed, covering agro-industrial hubs and light manufacturing assembly corridors.',
      zh: '在ACCBCF国际合作部统筹协调下，多国经贸主管官员与中资大型园区开发联合体举行了务实圆桌会议。各方紧密围绕既保障主权国家长远发展利益、又为外资制造企业提供可预期稳定营商环境的特许经营法治化路径交换意见。\n\n会议重点评估了在非洲大陆自由贸易区（AfCFTA）框架下打通跨境海关快速验放通道、引入本币计价结算试点及定向提供工业用电电价扶持等可行举措。现场签署了三项涵盖现代农业产业带与先进装备制造产业园的联合预可行性研究协议。',
    },
  },
  {
    id: 'mining-value-addition-summit',
    slug: 'mining-value-addition-critical-minerals-framework',
    title: {
      en: 'ACCBCF Mining Committee Advances Critical Minerals Value-Addition Framework at Abuja Roundtable',
      zh: 'ACCBCF矿业专业委员会在阿布贾发布关键矿产属地化深加工战略框架',
    },
    category: { en: 'Industry Action', zh: '行业聚焦' },
    date: '2026-05-12',
    author: 'Mining Committee',
    readTime: { en: '6 min read', zh: '阅读约 6 分钟' },
    image: '/images/forum/diplomatic-assembly-abuja.jpg',
    excerpt: {
      en: 'The Forum Mining Committee convened major mining chairmen and metallurgy technology providers to address domestic beneficiation of lithium, copper, and rare earths.',
      zh: '论坛矿业专业委员会召集非洲重要矿业企业负责人与中方冶金重工领军团队，全力推动锂、铜及稀有金属就地深加工。',
    },
    content: {
      en: 'The ACCBCF Mining Committee hosted a technical symposium in Abuja focused on transitioning from raw mineral exports to local refining and component manufacturing. Representatives from geological agencies, environmental regulators, and private mining consortiums outlined the technical criteria needed for domestic smelters and battery-precursor processing facilities.\n\nThe committee emphasized that high ESG standards and localized workforce skilling are integral to all upcoming joint ventures. A dedicated mining investment sub-fund is being structured in collaboration with development finance institutions to provide risk-capital for mineral exploration and ecological restoration.',
      zh: 'ACCBCF矿业专业委员会在阿布贾召开专题技术研讨会，深度探讨从单纯输出未经处理的毛矿向建设就地精炼冶炼厂与电池前驱体加工厂的历史性转变。地质调查部门、环保评估机构与大型矿业联合体共同审议了属地化冶炼建设的技术和环保合规门槛。\n\n专委会强调，卓越的ESG合规管理与属地技术工人培训是中非矿业合作的立足基石。目前，专委会正会同多家知名金融机构筹设专项绿色矿业产业发展基金，为新型开采技术的引进与矿区生态环境修复提供稳固的耐心资本支持。',
    },
  },
];

export const SAMPLE_NEWS = localized(RAW_SAMPLE_NEWS);

