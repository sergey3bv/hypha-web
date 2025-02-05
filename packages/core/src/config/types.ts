import { RepositoryToken } from '../container/repository-registry';

export type StorageTypePostgres = 'postgres';
export type StorageTypeMemory = 'memory';

export type StorageType = StorageTypePostgres | StorageTypeMemory;

export interface StorageConfig {
  space: StorageTypePostgres | StorageTypeMemory;
  documents: StorageTypePostgres;
  comment: StorageTypePostgres;
  people: StorageTypePostgres;
}

export interface CoreConfig {
  storage: StorageConfig;
  defaultPageSize?: number;
}

// Type for repository constructors
type RepositoryConstructor = new () => any;

// Type for partial implementation map
export type ImplementationMap = Partial<
  Record<StorageType, RepositoryConstructor>
>;

export type RepositoryMap = Map<RepositoryToken<any>, ImplementationMap>;
