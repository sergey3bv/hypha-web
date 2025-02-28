import { container } from './inversify.config';
import { CoreConfig } from '../config/types';
import { SYMBOLS } from './types';
import { Container } from 'inversify';
import { db, schema } from '@hypha-platform/storage-postgres';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

/**
 * Get the global InversifyJS container
 */
export function getContainer(): Container {
  return container;
}

/**
 * Configure the container with application config
 */
export function configureContainer(config: CoreConfig): void {
  // Update config in container
  if (container.isBound(SYMBOLS.StorageType)) {
    container.unbind(SYMBOLS.StorageType);
    container.bind(SYMBOLS.StorageType).toConstantValue(config);
  } else {
    container.bind(SYMBOLS.StorageType).toConstantValue(config);
  }
}

/**
 * Create a scoped container for a specific request context
 */
export function createRequestScope(context: { authToken?: string }) {
  // Create a new container for the request scope
  const requestContainer = new Container();

  // If we have auth token, configure database access
  if (context.authToken) {
    try {
      // Create Neon connection with auth token for RLS
      const sql = neon(process.env.DEFAULT_DB_AUTHENTICATED_URL!, {
        authToken: context.authToken, // This enables RLS with the user's permissions
      });

      // Create drizzle instance with the authenticated connection
      const authenticatedDb = drizzle(sql, { schema });

      // Bind the authenticated database
      requestContainer
        .bind(SYMBOLS.Database.UserConnection)
        .toConstantValue(authenticatedDb);
    } catch (error) {
      console.error('Failed to create authenticated DB connection:', error);
      // Fall back to admin connection
      requestContainer
        .bind(SYMBOLS.Database.UserConnection)
        .toConstantValue(db);
    }
  } else {
    // No auth token, use admin connection
    requestContainer.bind(SYMBOLS.Database.UserConnection).toConstantValue(db);
  }

  return requestContainer;
}
