import { DocumentRepositoryPostgres } from '../components/governance/repository-postgres';
import { PeopleRepositoryPostgres } from '../components/people/repository-postgres';
import { SpaceConfigPostgresRepository } from '../components/space-config/repository-postgres';
import { SpaceInMemoryRepository } from '../components/space/repository-memory';
import { SpacePostgresRepository } from '../components/space/repository-postgres';
import { CoreConfig } from './types';

export const defaultConfig: CoreConfig = {
  storage: {
    space: 'postgres',
    documents: 'postgres',
    comment: 'postgres',
    people: 'postgres',
  },
  defaultPageSize: 10,
};

// Map of repository implementations - no longer using the old token system
// This can be refactored or removed in a future update
// as the new DI system handles this differently
export const defaultRepositoryImplementations = {
  space: {
    postgres: SpacePostgresRepository,
    memory: SpaceInMemoryRepository,
  },
  spaceConfig: {
    postgres: SpaceConfigPostgresRepository,
  },
  document: {
    postgres: DocumentRepositoryPostgres,
  },
  people: {
    postgres: PeopleRepositoryPostgres,
  },
};
