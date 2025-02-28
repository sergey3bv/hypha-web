/**
 * Database provider module for managing different database connections.
 * This includes support for privileged connections and Neon RLS Authorize.
 */

import { injectable } from 'inversify';
import { db as defaultDb } from '@hypha-platform/storage-postgres';

// Define symbols for different DB connections
export const DB_TOKENS = {
  AdminConnection: Symbol('AdminConnection'),
  UserConnection: Symbol('UserConnection'),
};

/**
 * Options for creating a user-specific database connection
 */
export interface UserDatabaseOptions {
  /**
   * JWT token for user authentication with Neon RLS
   */
  authToken?: string;

  /**
   * The role to use (default: 'authenticated')
   */
  role?: 'authenticated' | 'anonymous';
}

/**
 * Simple database provider that allows injecting different database instances.
 * This is a temporary solution until we fully implement Neon RLS Authorize.
 */
@injectable()
export class DatabaseProvider {
  // For now, just return the default database
  // In future implementations, this will be enhanced to support RLS
  getAdminDatabase() {
    return defaultDb;
  }

  // This will be implemented once we have the infrastructure for user tokens
  getUserDatabase(options: UserDatabaseOptions = {}) {
    // For now, just use the default db
    // Later this will use the auth token with Neon RLS
    return defaultDb;
  }
}
