import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_videos_status" AS ENUM('published', 'draft', 'archived');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_videos_category" AS ENUM('Summit & Events', 'Keynote & Presentations', 'Bilateral Dialogue', 'Strategic Sectors', 'Special Coverage');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "public"."videos" (
      "id" serial PRIMARY KEY NOT NULL,
      "youtube_url" varchar NOT NULL,
      "youtube_video_id" varchar NOT NULL,
      "event_date" timestamp(3) with time zone,
      "thumbnail_url" varchar,
      "featured_image_id" integer,
      "category" "enum_videos_category" DEFAULT 'Summit & Events',
      "tags" varchar,
      "display_order" numeric DEFAULT 1,
      "featured" boolean DEFAULT false,
      "status" "enum_videos_status" DEFAULT 'published' NOT NULL,
      "created_by_id" integer,
      "created_by_name" varchar DEFAULT 'ACCBCF Media',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "public"."videos_locales" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "event_name" varchar,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "public"."videos" 
        ADD CONSTRAINT "videos_created_by_id_users_id_fk" 
        FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "public"."videos" 
        ADD CONSTRAINT "videos_featured_image_id_media_id_fk" 
        FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "public"."videos_locales" 
        ADD CONSTRAINT "videos_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "public"."payload_locked_documents_rels" 
    ADD COLUMN IF NOT EXISTS "videos_id" integer;

    DO $$ BEGIN
      ALTER TABLE "public"."payload_locked_documents_rels" 
        ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" 
        FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "videos_created_by_idx" ON "public"."videos" USING btree ("created_by_id");
    CREATE INDEX IF NOT EXISTS "videos_featured_image_idx" ON "public"."videos" USING btree ("featured_image_id");
    CREATE INDEX IF NOT EXISTS "videos_display_order_idx" ON "public"."videos" USING btree ("display_order");
    CREATE INDEX IF NOT EXISTS "videos_status_idx" ON "public"."videos" USING btree ("status");
    CREATE INDEX IF NOT EXISTS "videos_updated_at_idx" ON "public"."videos" USING btree ("updated_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "videos_locales_locale_parent_id_unique" ON "public"."videos_locales" USING btree ("_locale", "_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "public"."videos_locales" CASCADE;
    DROP TABLE IF EXISTS "public"."videos" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_videos_status";
    DROP TYPE IF EXISTS "public"."enum_videos_category";
  `);
}

