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
    }
  } catch (err) {
    console.log('User check/creation note:', err);
  }

  // 2. Seed Global Site Settings
  try {
    await payload.updateGlobal({
      slug: 'siteSettings',
      data: {
        headline: SITE_INFO.name.en,
        slogan: SITE_INFO.slogan.en,
        email: SITE_INFO.email,
        phone: SITE_INFO.phone,
        whatsapp: SITE_INFO.whatsapp,
        address: SITE_INFO.hqAddress.en,
      },
    });
    console.log('Updated SiteSettings global');
  } catch (err) {
    console.log('SiteSettings note:', err);
  }

  // 3. Seed Core Services
  try {
    const existingServices = await payload.find({
      collection: 'coreServices',
      limit: 1,
    });

    if (existingServices.totalDocs === 0) {
      for (let i = 0; i < CORE_SERVICES.length; i++) {
        const srv = CORE_SERVICES[i];
        await payload.create({
          collection: 'coreServices',
          data: {
            name: srv.name.en,
            slug: srv.slug,
            icon: srv.icon,
            shortDescription: srv.shortDescription.en,
            longDescription: srv.longDescription.en,
            order: i,
          },
        });
      }
      console.log(`Seeded ${CORE_SERVICES.length} Core Services`);
    }
  } catch (err) {
    console.log('CoreServices seed note:', err);
  }

  // 4. Seed Priority Sectors
  try {
    const existingSectors = await payload.find({
      collection: 'prioritySectors',
      limit: 1,
    });

    if (existingSectors.totalDocs === 0) {
      for (let i = 0; i < PRIORITY_SECTORS.length; i++) {
        const sec = PRIORITY_SECTORS[i];
        await payload.create({
          collection: 'prioritySectors',
          data: {
            name: sec.name.en,
            slug: sec.slug,
            icon: sec.icon,
            shortDescription: sec.description.en,
            details: sec.details.en,
            order: i,
          },
        });
      }
      console.log(`Seeded ${PRIORITY_SECTORS.length} Priority Sectors`);
    }
  } catch (err) {
    console.log('PrioritySectors seed note:', err);
  }

  // 5. Seed News Posts
  try {
    const existingPosts = await payload.find({
      collection: 'posts',
      limit: 1,
    });

    if (existingPosts.totalDocs === 0) {
      for (const post of SAMPLE_NEWS) {
        await payload.create({
          collection: 'posts',
          data: {
            title: post.title.en,
            slug: post.slug,
            category: post.category.en as any,
            featuredImageUrl: post.image,
            publishedDate: post.date,
            author: post.author,
            excerpt: post.excerpt.en,
            body: post.content.en,
          },
        });
      }
      console.log(`Seeded ${SAMPLE_NEWS.length} News Dispatches`);
    }
  } catch (err) {
    console.log('Posts seed note:', err);
  }

  console.log('Database seeding complete.');
}
