import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_seo_settings_twitter_card_type" AS ENUM('summary_large_image', 'summary');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_seo_settings_org_type" AS ENUM('GovernmentOrganization', 'NGO', 'Organization');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_seo_settings_indexing_directive" AS ENUM('index, follow', 'noindex, nofollow');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "public"."seo_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "title_template" varchar DEFAULT '%s | Africa China Chairmen of Business Forum',
      "canonical_base_url" varchar DEFAULT 'https://www.africachinachairmenforum.com' NOT NULL,
      "og_image_id" integer,
      "og_image_url" varchar DEFAULT '/images/accbcf-emblem.jpg',
      "twitter_card_type" "enum_seo_settings_twitter_card_type" DEFAULT 'summary_large_image',
      "twitter_handle" varchar DEFAULT '@accbcf_official',
      "google_verification" varchar,
      "bing_verification" varchar,
      "baidu_verification" varchar,
      "yandex_verification" varchar,
      "google_analytics_id" varchar,
      "baidu_tongji_id" varchar,
      "org_legal_name" varchar DEFAULT 'Africa China Chairmen of Business Forum',
      "org_alternate_name" varchar DEFAULT '非洲中国会长论坛 (ACCBCF)',
      "org_type" "enum_seo_settings_org_type" DEFAULT 'GovernmentOrganization',
      "contact_point_telephone" varchar DEFAULT '+234 916 016 6906',
      "contact_point_email" varchar DEFAULT 'africachinachairmenforum@gmail.com',
      "indexing_directive" "enum_seo_settings_indexing_directive" DEFAULT 'index, follow',
      "enable_sitemap" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now(),
      "created_at" timestamp(3) with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "public"."seo_settings_locales" (
      "id" serial PRIMARY KEY NOT NULL,
      "site_name" varchar DEFAULT 'Africa China Chairmen of Business Forum (ACCBCF)',
      "default_meta_description" varchar DEFAULT 'Official platform connecting African and Chinese governments, business leadership, and capital. Headquartered at the Federal Ministry of Industry, Trade and Investment in Abuja, Nigeria.',
      "default_keywords" varchar DEFAULT 'ACCBCF, Africa China Chairmen of Business Forum, 非洲中国会长论坛, China Africa Trade, Abuja HQ, FMITI Nigeria, G2G, G2B, B2B, Investment in Africa',
      "home_seo_title" varchar,
      "home_seo_description" varchar,
      "home_seo_keywords" varchar,
      "about_seo_title" varchar,
      "about_seo_description" varchar,
      "about_seo_keywords" varchar,
      "founders_seo_title" varchar,
      "founders_seo_description" varchar,
      "governance_seo_title" varchar,
      "governance_seo_description" varchar,
      "programs_seo_title" varchar,
      "programs_seo_description" varchar,
      "sectors_seo_title" varchar,
      "sectors_seo_description" varchar,
      "events_seo_title" varchar,
      "events_seo_description" varchar,
      "news_seo_title" varchar,
      "news_seo_description" varchar,
      "contact_seo_title" varchar,
      "contact_seo_description" varchar,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "public"."seo_settings" 
        ADD CONSTRAINT "seo_settings_og_image_id_media_id_fk" 
        FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "public"."seo_settings_locales" 
        ADD CONSTRAINT "seo_settings_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "seo_settings_og_image_idx" ON "public"."seo_settings" USING btree ("og_image_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "seo_settings_locales_locale_parent_id_unique" ON "public"."seo_settings_locales" USING btree ("_locale", "_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "public"."seo_settings_locales" CASCADE;
    DROP TABLE IF EXISTS "public"."seo_settings" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_seo_settings_twitter_card_type";
    DROP TYPE IF EXISTS "public"."enum_seo_settings_org_type";
    DROP TYPE IF EXISTS "public"."enum_seo_settings_indexing_directive";
  `);
}
