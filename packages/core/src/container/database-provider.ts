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
  private userOptions?: UserDatabaseOptions;

  /**
   * Configure the user context for future database operations
   */
  configureUser(options: UserDatabaseOptions): void {
    this.userOptions = options;
  }

  /**
   * Get the admin database connection (privileged)
   */
  getAdminDatabase() {
    return defaultDb;
  }

  /**
   * Get a user-specific database connection with RLS
   * @param options Override options for this specific request
   */
  getUserDatabase(options: UserDatabaseOptions = {}) {
    // For now, just use the default db
    // Later this will use the auth token with Neon RLS
    // Merge saved options with provided options, with provided taking precedence
    const effectiveOptions = { ...this.userOptions, ...options };

    // TODO: When implementing RLS, create a new connection with the authToken
    // console.log('Using auth token for DB:', effectiveOptions.authToken);

    return defaultDb;
  }
}
