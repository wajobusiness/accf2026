import * as migration_20260911_111355_init from './20260911_111355_init';
import * as migration_20260920_144500_add_videos from './20260920_144500_add_videos';
import * as migration_20260924_120000_add_seo_settings from './20260924_120000_add_seo_settings';

export const migrations = [
  {
    up: migration_20260911_111355_init.up,
    down: migration_20260911_111355_init.down,
    name: '20260911_111355_init'
  },
  {
    up: migration_20260920_144500_add_videos.up,
    down: migration_20260920_144500_add_videos.down,
    name: '20260920_144500_add_videos'
  },
  {
    up: migration_20260924_120000_add_seo_settings.up,
    down: migration_20260924_120000_add_seo_settings.down,
    name: '20260924_120000_add_seo_settings'
  },
];
