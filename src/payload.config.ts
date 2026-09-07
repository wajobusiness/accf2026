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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Support Postgres when DATABASE_URI is specified, fallback to SQLite for local preview
const isPostgres = Boolean(process.env.DATABASE_URI && process.env.DATABASE_URI.startsWith('postgres'));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
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
  secret: process.env.PAYLOAD_SECRET || 'accbcf-super-secret-production-key-2026-abuja',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
        },
      })
    : sqliteAdapter({
        client: {
          url: 'file:./local-accbcf.db',
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
    ],
    defaultLocale: 'en',
    fallback: true,
  },
});
