export type StorageType = 'memory' | 'postgres';

export interface StorageConfig {
  space: StorageType;
  agreement: StorageType;
  member: StorageType;
  comment: StorageType;
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

export type RepositoryMap = Map<symbol, ImplementationMap>;
