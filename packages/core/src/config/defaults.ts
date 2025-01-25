import { PostgresSpaceConfigRepository } from '../components/space-config/repository-postgres';
import { InMemorySpaceRepository } from '../components/space/repository-memory';
import { PostgresSpaceRepository } from '../components/space/repository-postgres';
import { Tokens } from '../container/tokens';
import { CoreConfig, RepositoryMap } from './types';

export const defaultConfig: CoreConfig = {
  storage: {
    space: 'memory',
    agreement: 'memory',
    member: 'memory',
    comment: 'memory',
  },
  defaultPageSize: 10,
};

// Map storage types to repository implementations
export const defaultRepositoryMap: RepositoryMap = new Map([
  [
    Tokens.SpaceRepository,
    {
      postgres: PostgresSpaceRepository,
      memory: InMemorySpaceRepository,
    },
  ],
  [
    Tokens.SpaceConfigRepository,
    {
      postgres: PostgresSpaceConfigRepository,
    },
  ],
]);
