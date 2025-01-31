import { DocumentRepositoryPostgres } from '../components/governance/repository-postgres';
import { SpaceConfigPostgresRepository } from '../components/space-config/repository-postgres';
import { SpaceInMemoryRepository } from '../components/space/repository-memory';
import { SpacePostgresRepository } from '../components/space/repository-postgres';
import { RepositoryToken } from '../container/repository-registry';
import { Tokens } from '../container/tokens';
import { CoreConfig, ImplementationMap } from './types';

export const defaultConfig: CoreConfig = {
  storage: {
    space: 'postgres',
    agreement: 'postgres',
    member: 'postgres',
    comment: 'postgres',
  },
  defaultPageSize: 10,
};

// Map storage types to repository implementations
export const defaultRepositoryMap = new Map<
  RepositoryToken<any>,
  ImplementationMap
>([
  [
    Tokens.SpaceRepository,
    {
      postgres: SpacePostgresRepository,
      memory: SpaceInMemoryRepository,
    },
  ],
  [
    Tokens.SpaceConfigRepository,
    {
      postgres: SpaceConfigPostgresRepository,
    },
  ],
  [
    Tokens.DocumentRepository,
    {
      postgres: DocumentRepositoryPostgres,
    },
  ],
]);
