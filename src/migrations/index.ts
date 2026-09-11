import * as migration_20260911_111355_init from './20260911_111355_init';

export const migrations = [
  {
    up: migration_20260911_111355_init.up,
    down: migration_20260911_111355_init.down,
    name: '20260911_111355_init'
  },
];
