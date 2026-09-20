import * as migration_20260911_111355_init from './20260911_111355_init';
import * as migration_20260920_144500_add_videos from './20260920_144500_add_videos';

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
];
