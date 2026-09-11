import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Posts } from './collections/Posts';
import { CommitteeMembers } from './collections/CommitteeMembers';
import { CoreServices } from './collections/CoreServices';
import { PrioritySectors } from './collections/PrioritySectors';
import { Events } from './collections/Events';
import { SiteSettings } from './globals/SiteSettings';
import { migrations } from './migrations';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Support Postgres when DATABASE_URI is specified, fallback to SQLite for local preview
function getDatabaseConfig() {
  let uri = process.env.DATABASE_URI || '';
  
  // Supabase direct URLs are IPv6-only. When deployed to Vercel/serverless environments,
  // automatically route through the IPv4-compatible connection pooler on transaction port 6543.
  if (uri.includes('db.tqeqccszyxstsxtoffzf.supabase.co')) {
    uri = uri
      .replace('postgresql://postgres:', 'postgresql://postgres.tqeqccszyxstsxtoffzf:')
      .replace('db.tqeqccszyxstsxtoffzf.supabase.co:5432', 'aws-0-eu-west-2.pooler.supabase.com:6543')
      .replace('db.tqeqccszyxstsxtoffzf.supabase.co', 'aws-0-eu-west-2.pooler.supabase.com:6543');
  } else if (uri.includes('aws-0-eu-west-2.pooler.supabase.com:5432')) {
    uri = uri.replace(':5432', ':6543');
  }

  const isPostgres = Boolean(uri && uri.startsWith('postgres'));

  return {
    isPostgres,
    uri,
  };
}

const { isPostgres, uri: sanitizedDbUri } = getDatabaseConfig();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · ACCBCF Admin Portal',
      description: 'Institutional Admin & Content Management System for Africa China Chairmen of Business Forum',
      icons: [
        {
          rel: 'icon',
          url: '/images/accbcf-logo.svg',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#Logo',
        Icon: '@/components/admin/Icon#Icon',
      },
      afterNavLinks: [
        '@/components/admin/LiveSiteAction#LiveSiteAction',
      ],
      beforeDashboard: [
        '@/components/admin/DashboardHeader#DashboardHeader',
      ],
      beforeLogin: [
        '@/components/admin/LoginNotice#LoginNotice',
      ],
    },
  },
  collections: [
    Users,
    Media,
    Posts,
    CommitteeMembers,
    CoreServices,
    PrioritySectors,
    Events,
  ],
  globals: [
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret:
    process.env.PAYLOAD_SECRET ||
    'c7d0aefc5a0db2eaeb6569b7d5dd6bb42baab06365e701658ef211e1e93d4749',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: sanitizedDbUri,
          ssl:
            sanitizedDbUri.includes('supabase') ||
            sanitizedDbUri.includes('neon') ||
            sanitizedDbUri.includes('sslmode=require')
              ? { rejectUnauthorized: false }
              : undefined,
        },
        push: false,
        prodMigrations: migrations,
      })
    : sqliteAdapter({
        client: {
          url: process.env.VERCEL ? 'file:/tmp/local-accbcf.db' : 'file:./local-accbcf.db',
        },
      }),
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: '中文 (Chinese)',
        code: 'zh',
      },
      {
        label: 'Français (French)',
        code: 'fr',
      },
      {
        label: 'العربية (Arabic)',
        code: 'ar',
        rtl: true,
      },
      {
        label: 'Português (Portuguese)',
        code: 'pt',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
});
