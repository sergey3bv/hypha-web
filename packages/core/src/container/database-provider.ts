/**
 * Database provider module for managing different database connections.
 * This includes support for privileged connections and Neon RLS Authorize.
 */

import { injectable } from 'inversify';
import { db as defaultDb, schema } from '@hypha-platform/storage-postgres';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

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

// Define a generic database type that can be either Neon or NodePg
export type DatabaseInstance =
  | NodePgDatabase<typeof schema>
  | NeonHttpDatabase<typeof schema>;

/**
 * Database provider that manages connection types including RLS-authenticated connections
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
  getAdminDatabase(): NodePgDatabase<typeof schema> {
    return defaultDb;
  }

  /**
   * Get a user-specific database connection with RLS
   * @param options Override options for this specific request
   */
  getUserDatabase(options: UserDatabaseOptions = {}): DatabaseInstance {
    // Merge saved options with provided options, with provided taking precedence
    const effectiveOptions = { ...this.userOptions, ...options };

    if (effectiveOptions.authToken) {
      try {
        // Create Neon connection with auth token for RLS
        const sql = neon(process.env.DEFAULT_DB_AUTHENTICATED_URL!, {
          authToken: effectiveOptions.authToken, // This enables RLS with the user's permissions
        });

        // Create drizzle instance with the authenticated connection
        return drizzle(sql, { schema });
      } catch (error) {
        console.error('Failed to create authenticated DB connection:', error);
        // Fall back to admin connection if token is invalid
      }
    }

    // No auth token or connection failed, use admin connection
    return defaultDb;
  }
}
