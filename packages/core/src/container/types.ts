import { CoreConfig } from '../config/types';

// Base Repository interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
export interface Repository {}

export interface Container {
  config: CoreConfig;
  get<T>(token: symbol): T;
  register<T>(token: symbol, value: T): void;
  createScope(): Container;
}

// Define symbol namespace for all injectable tokens
export const SYMBOLS = {
  // Core system symbols
  StorageType: Symbol('StorageType'),

  // Database connections
  Database: {
    AdminConnection: Symbol('Database.AdminConnection'),
    UserConnection: Symbol('Database.UserConnection'),
  },

  // Repository symbols
  // These will replace the existing repository tokens
  Repositories: {
    // Main repositories from the existing system
    SpaceRepository: Symbol('SpaceRepository'),
    SpaceConfigRepository: Symbol('SpaceConfigRepository'),
    DocumentRepository: Symbol('DocumentRepository'),
    PeopleRepository: Symbol('PeopleRepository'),

    // Additional repositories that appear in the tokens file
    AgreementRepository: Symbol('AgreementRepository'),
    MemberRepository: Symbol('MemberRepository'),
    CommentRepository: Symbol('CommentRepository'),
  },
};

// Type-safe repository token helper
export type RepositoryToken<T extends Repository> = symbol & { __type: T };

// Helper to create a type-safe repository token
export function createRepositoryToken<T extends Repository>(
  name: string,
): RepositoryToken<T> {
  return Symbol(name) as RepositoryToken<T>;
}

// Record to track repository implementations by storage type
export type RepositoryImplementations<T extends Repository> = Record<
  string,
  new (...args: any[]) => T
>;

// For backward compatibility during migration
export const tokenToSymbolMap = new Map<RepositoryToken<any>, symbol>();
