import { getPayload } from 'payload';
import config from '../payload.config';
import {
  SITE_INFO,
  CORE_SERVICES,
  PRIORITY_SECTORS,
  SAMPLE_NEWS,
} from '../lib/content';

export async function seedDatabase() {
  const payload = await getPayload({ config });

  console.log('Seeding ACCBCF database from Product Bible...');

  // 1. Create Default Admin User if none exists
  try {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    });

    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@accbcf.org',
          password: 'Accbcf2026Admin!#',
          name: 'ACCBCF Secretariat Admin',
        },
      });
      console.log('Created default admin: admin@accbcf.org');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.log('User check/creation note:', err);
  }

  // 2. Seed Global Site Settings
  try {
    await payload.updateGlobal({
      slug: 'siteSettings',
      locale: 'en',
      data: {
        headline: SITE_INFO.name.en,
        slogan: SITE_INFO.slogan.en,
        email: SITE_INFO.email,
        phone: SITE_INFO.phone,
        whatsapp: SITE_INFO.whatsapp,
        address: SITE_INFO.hqAddress.en,
      },
    });

    await payload.updateGlobal({
      slug: 'siteSettings',
      locale: 'zh',
      data: {
        headline: SITE_INFO.name.zh,
        slogan: SITE_INFO.slogan.zh,
        address: SITE_INFO.hqAddress.zh,
      },
    });
    console.log('Updated SiteSettings global (en + zh)');
  } catch (err) {
    console.log('SiteSettings note:', err);
  }

  // 3. Seed Core Services
  try {
    const existingServices = await payload.find({
      collection: 'coreServices',
      limit: 100,
    });
    const existingServiceMap = new Map(existingServices.docs.map((doc: any) => [doc.slug, doc.id]));

    for (let i = 0; i < CORE_SERVICES.length; i++) {
      const srv = CORE_SERVICES[i];
      let docId = existingServiceMap.get(srv.slug);

      if (!docId) {
        const created = await payload.create({
          collection: 'coreServices',
          locale: 'en',
          data: {
            name: srv.name.en,
            slug: srv.slug,
            icon: srv.icon,
            shortDescription: srv.shortDescription.en,
            longDescription: srv.longDescription.en,
            order: i,
          },
        });
        docId = created.id;
      } else {
        await payload.update({
          collection: 'coreServices',
          id: docId,
          locale: 'en',
          data: {
            name: srv.name.en,
            icon: srv.icon,
            shortDescription: srv.shortDescription.en,
            longDescription: srv.longDescription.en,
            order: i,
          },
        });
      }

      await payload.update({
        collection: 'coreServices',
        id: docId,
        locale: 'zh',
        data: {
          name: srv.name.zh,
          shortDescription: srv.shortDescription.zh,
          longDescription: srv.longDescription.zh,
        },
      });
    }
    console.log(`Seeded/Updated ${CORE_SERVICES.length} Core Services`);
  } catch (err) {
    console.log('CoreServices seed note:', err);
  }

  // 4. Seed Priority Sectors with Enriched Briefing Data
  try {
    const existingSectors = await payload.find({
      collection: 'prioritySectors',
      limit: 100,
    });
    const existingSectorMap = new Map(existingSectors.docs.map((doc: any) => [doc.slug, doc.id]));

    for (let i = 0; i < PRIORITY_SECTORS.length; i++) {
      const sec = PRIORITY_SECTORS[i];
      let docId = existingSectorMap.get(sec.slug);

      const enData = {
        name: sec.name.en,
        slug: sec.slug,
        icon: sec.icon,
        shortDescription: sec.description.en,
        details: sec.details.en,
        valueAdditionStrategy: sec.valueAdditionStrategy?.en || '',
        bilateralMechanisms: sec.bilateralMechanisms?.en || '',
        policyAlignment: sec.policyAlignment?.en || '',
        actionCommittee: sec.actionCommittee?.en || '',
        strategicFocus: sec.strategicFocus?.map((item: any) => ({ point: item.en })) || [],
        keyOpportunities: sec.keyOpportunities?.map((item: any) => ({ opportunity: item.en })) || [],
        order: i,
      };

      if (!docId) {
        const created = await payload.create({
          collection: 'prioritySectors',
          locale: 'en',
          data: enData,
        });
        docId = created.id;
      } else {
        await payload.update({
          collection: 'prioritySectors',
          id: docId,
          locale: 'en',
          data: enData,
        });
      }

      await payload.update({
        collection: 'prioritySectors',
        id: docId,
        locale: 'zh',
        data: {
          name: sec.name.zh,
          shortDescription: sec.description.zh,
          details: sec.details.zh,
          valueAdditionStrategy: sec.valueAdditionStrategy?.zh || '',
          bilateralMechanisms: sec.bilateralMechanisms?.zh || '',
          policyAlignment: sec.policyAlignment?.zh || '',
          actionCommittee: sec.actionCommittee?.zh || '',
          strategicFocus: sec.strategicFocus?.map((item: any) => ({ point: item.zh })) || [],
          keyOpportunities: sec.keyOpportunities?.map((item: any) => ({ opportunity: item.zh })) || [],
        },
      });
    }
    console.log(`Seeded/Updated ${PRIORITY_SECTORS.length} Priority Sectors with Enriched Briefings`);
  } catch (err) {
    console.log('PrioritySectors seed note:', err);
  }

  // 5. Seed Committee Members
  try {
    const existingMembers = await payload.find({
      collection: 'committeeMembers',
      limit: 100,
    });

    if (existingMembers.totalDocs === 0) {
      const COMMITTEE_LEADERS = [
        {
          name: 'Hon. Co-Chairman (African Delegation)',
          title: { en: 'Co-Chairman of the Board of Directors (Africa)', zh: '论坛联合主席（非方代表）' },
          committee: 'board',
          department: { en: 'Board of Directors', zh: '董事局' },
          bio: {
            en: 'Distinguished African enterprise leader and industrialist steering continental private sector mobilization under AfCFTA.',
            zh: '非洲杰出商界领袖与工业家，致力于在AfCFTA框架下推动非洲本土产业发展与双边战略伙伴关系。',
          },
          photoUrl: '/images/forum/01.jpeg',
          order: 1,
        },
        {
          name: 'Hon. Co-Chairman (Chinese Delegation)',
          title: { en: 'Co-Chairman of the Board of Directors (China)', zh: '论坛联合主席（中方代表）' },
          committee: 'board',
          department: { en: 'Board of Directors', zh: '董事局' },
          bio: {
            en: 'Eminent conglomerate chairman coordinating Chinese direct investment, advanced technology transfer, and large-scale industrial projects.',
            zh: '中资领军跨国集团董事长，统筹对非直接投资、先进工业技术转移及大型实体产业集群合作。',
          },
          photoUrl: '/images/forum/02.jpeg',
          order: 2,
        },
        {
          name: 'Chief Stakeholders Representative',
          title: { en: 'Vice-Chair, Stakeholders Leadership Committee', zh: '利益相关方领袖委员会副主席' },
          committee: 'stakeholders',
          department: { en: 'Stakeholders Leadership Committee', zh: '利益相关方领袖委员会' },
          bio: {
            en: 'National Chamber of Commerce leader aligning regional private sector interests across West and Central Africa.',
            zh: '国家级总商会会长，协调西非与中非经济走廊的私营部门战略协同与政策倡议。',
          },
          photoUrl: '/images/forum/03.jpeg',
          order: 3,
        },
        {
          name: 'Ambassadorial Strategic Counselor',
          title: { en: 'Senior Diplomatic & Geopolitical Advisor', zh: '高级外交与地缘经济战略顾问' },
          committee: 'advisory',
          department: { en: 'Senior Advisory Committee', zh: '高级顾问委员会' },
          bio: {
            en: 'Former multilateral ambassador providing high-level counsel on inter-governmental protocols and sovereign risk mitigation.',
            zh: '资深前多边外交大使，为主权级双边经济协议磋商与跨境宏观风险防范提供战略指导。',
          },
          photoUrl: '/images/forum/04.jpeg',
          order: 4,
        },
        {
          name: 'Director-General / Secretary-General',
          title: { en: 'Secretary-General & Chief Executive', zh: '论坛秘书长兼行政总裁' },
          committee: 'executive',
          department: { en: 'Executive Management Committee', zh: '执行管理委员会' },
          bio: {
            en: 'Managing daily secretariat operations at the Federal Ministry complex in Abuja, inter-ministerial coordination, and platform execution.',
            zh: '主持阿布贾旧联邦秘书处常设机构日常运行，统筹部委联络与论坛决议高效实施。',
          },
          photoUrl: '/images/forum/05.jpeg',
          order: 5,
        },
        {
          name: 'Director of International Cooperation',
          title: { en: 'Director, Bilateral Government & Protocol Relations', zh: '国际合作部部长' },
          committee: 'secretariat',
          department: { en: 'International Cooperation Department', zh: '国际合作部' },
          bio: {
            en: 'Leading G2G negotiations, ministerial trade roundtables, and institutional partnership frameworks.',
            zh: '负责G2G高级别会晤、部长级圆桌对话及主权级双边合作备忘录推进。',
          },
          photoUrl: '/images/forum/06.jpeg',
          order: 6,
        },
        {
          name: 'Chief Commercial Mediation Officer',
          title: { en: 'Director, China–Africa Business Mediation Center', zh: '中非商事调解中心主任' },
          committee: 'secretariat',
          department: { en: 'China–Africa Business Mediation Center', zh: '中非商事调解中心' },
          bio: {
            en: 'Specializing in cross-border contract compliance, international arbitration, and sovereign commercial dispute settlement.',
            zh: '专业深耕跨境涉外法务合规、商事仲裁调解与海外中资及非洲企业合法权益保障。',
          },
          photoUrl: '/images/forum/07.jpeg',
          order: 7,
        },
        {
          name: 'Director of Trade & Investment Promotion',
          title: { en: 'Head of Deal Pipeline & Project Matching', zh: '经贸投资促进部部长' },
          committee: 'secretariat',
          department: { en: 'Trade & Investment Department', zh: '经贸投资部' },
          bio: {
            en: 'Overseeing bankable project evaluation, capital matchmaking, and Chinese industrial relocation pipelines.',
            zh: '负责优质可融性项目遴选、资本精准撮合及中资制造业梯度转移落地对接。',
          },
          photoUrl: '/images/forum/08.jpeg',
          order: 8,
        },
      ];

      for (const member of COMMITTEE_LEADERS) {
        const created = await payload.create({
          collection: 'committeeMembers',
          locale: 'en',
          data: {
            name: member.name,
            title: member.title.en,
            committee: member.committee as any,
            department: member.department.en,
            bio: member.bio.en,
            photoUrl: member.photoUrl,
            order: member.order,
          },
        });

        await payload.update({
          collection: 'committeeMembers',
          id: created.id,
          locale: 'zh',
          data: {
            title: member.title.zh,
            department: member.department.zh,
            bio: member.bio.zh,
          },
        });
      }
      console.log(`Seeded ${COMMITTEE_LEADERS.length} Committee Members`);
    } else {
      console.log('Committee members already exist');
    }
  } catch (err) {
    console.log('CommitteeMembers seed note:', err);
  }

  // 6. Seed Events
  try {
    const existingEvents = await payload.find({
      collection: 'events',
      limit: 100,
    });

    if (existingEvents.totalDocs === 0) {
      const EVENTS_DATA = [
        {
          title: {
            en: 'Inaugural General Assembly of the Africa China Chairmen of Business Forum',
            zh: '非洲中国会长论坛（ACCBCF）全球成立大会',
          },
          date: new Date('2026-03-30T10:00:00Z').toISOString(),
          location: {
            en: 'Federal Ministry of Industry, Trade and Investment, Abuja, Nigeria',
            zh: '尼日利亚阿布贾联邦工业、贸易和投资部大院',
          },
          description: {
            en: 'Ministerial dignitaries, chamber presidents, and over one hundred enterprise chairmen gathered to celebrate the formal charter of ACCBCF.',
            zh: '非洲多国经贸部长、中资商会会长及百余位骨干企业董事长齐聚阿布贾，共同见证论坛常设机构设立与首批重点项目启动。',
          },
          registrationLink: '/en/news/inauguration-of-accbcf-in-abuja',
          isPast: true,
        },
        {
          title: {
            en: 'Africa–China Ministerial Roundtable on Industrial Value Addition & AfCFTA Integration',
            zh: '中非制造业属地化深加工与自贸区发展部长级圆桌会',
          },
          date: new Date('2026-06-25T09:30:00Z').toISOString(),
          location: {
            en: 'Transcorp Hilton & Old Federal Secretariat, Abuja',
            zh: '尼日利亚阿布贾希尔顿国际会议厅与旧联邦秘书处',
          },
          description: {
            en: 'Closed-door bilateral ministerial dialogue bringing together trade ministers, industrial park authorities, and Chinese manufacturing consortia.',
            zh: '高级别闭门政企对话会，重点评估自贸特区税收减免政策、绿色清关通道与工业园特许经营权落地。',
          },
          registrationLink: '/en/contact?event=ministerial-roundtable-2026',
          isPast: false,
        },
        {
          title: {
            en: 'China–Africa Critical Minerals & Green Smelting Technology Symposium',
            zh: '中非关键矿产深加工与绿色冶炼技术对接会',
          },
          date: new Date('2026-08-15T10:00:00Z').toISOString(),
          location: {
            en: 'Johannesburg / Beijing Hybrid Plenary',
            zh: '约翰内斯堡与北京视频连线双会场',
          },
          description: {
            en: 'Technical and investment matchmaking conference focusing on lithium, copper, and cobalt local beneficiation and environmental ESG compliance.',
            zh: '聚焦锂、铜、钴关键矿产就地深加工、生态环保高标准合规及中非矿业发展专项子基金设立。',
          },
          registrationLink: '/en/contact?event=minerals-symposium-2026',
          isPast: false,
        },
        {
          title: {
            en: '2026 Annual Africa China Chairmen Summit & Bilateral Trade Exposition',
            zh: '2026非洲中国会长年会暨双边经贸博览会',
          },
          date: new Date('2026-11-18T09:00:00Z').toISOString(),
          location: {
            en: 'International Conference Centre, Abuja, Nigeria',
            zh: '尼日利亚阿布贾国际会议中心',
          },
          description: {
            en: 'Flagship bilateral annual summit assembling over 500 chairmen, sovereigns, and sovereign wealth fund executives to formalize major G2G and B2B joint ventures.',
            zh: '论坛年度旗舰峰会，汇聚逾500位非中商业领袖、主权基金及政府高层，现场签约重大产业合资项目。',
          },
          registrationLink: '/en/contact?event=annual-summit-2026',
          isPast: false,
        },
      ];

      for (const ev of EVENTS_DATA) {
        const created = await payload.create({
          collection: 'events',
          locale: 'en',
          data: {
            title: ev.title.en,
            date: ev.date,
            location: ev.location.en,
            description: ev.description.en,
            registrationLink: ev.registrationLink,
            isPast: ev.isPast,
          },
        });

        await payload.update({
          collection: 'events',
          id: created.id,
          locale: 'zh',
          data: {
            title: ev.title.zh,
            location: ev.location.zh,
            description: ev.description.zh,
          },
        });
      }
      console.log(`Seeded ${EVENTS_DATA.length} Bilateral Events`);
    } else {
      console.log('Events already exist');
    }
  } catch (err) {
    console.log('Events seed note:', err);
  }

  // 7. Seed News Posts
  try {
    const existingPosts = await payload.find({
      collection: 'posts',
      limit: 100,
    });
    const existingPostMap = new Map(existingPosts.docs.map((doc: any) => [doc.slug, doc.id]));

    for (const post of SAMPLE_NEWS) {
      let docId = existingPostMap.get(post.slug);

      const enData = {
        title: post.title.en,
        slug: post.slug,
        category: post.category.en as any,
        featuredImageUrl: post.image,
        publishedDate: post.date,
        author: post.author,
        excerpt: post.excerpt.en,
        body: post.content.en,
      };

      if (!docId) {
        const created = await payload.create({
          collection: 'posts',
          locale: 'en',
          data: enData,
        });
        docId = created.id;
      } else {
        await payload.update({
          collection: 'posts',
          id: docId,
          locale: 'en',
          data: enData,
        });
      }

      await payload.update({
        collection: 'posts',
        id: docId,
        locale: 'zh',
        data: {
          title: post.title.zh,
          excerpt: post.excerpt.zh,
          body: post.content.zh,
        },
      });
    }
    console.log(`Seeded/Updated ${SAMPLE_NEWS.length} News Dispatches`);
  } catch (err) {
    console.log('Posts seed note:', err);
  }

  console.log('Database seeding complete.');
}
