import { defaultConfig } from '../../config/defaults';
import { PeopleService } from './service';
import { PeopleRepositoryPostgres } from './repository-postgres';
import { db as defaultDb } from '@hypha-platform/storage-postgres';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema } from '@hypha-platform/storage-postgres';

type CreatePeopleServiceProps = {
  config?: typeof defaultConfig;
  authToken?: string;
};

export const createPeopleService = ({
  config = defaultConfig,
  authToken,
}: CreatePeopleServiceProps = {}) => {
  // Create database connection based on authentication status
  let db;

  if (authToken) {
    // Use authenticated connection with the JWT token for RLS
    console.log('Using authenticated connection with token');

    try {
      // Create Neon connection with auth token for RLS
      const sql = neon(process.env.DEFAULT_DB_AUTHENTICATED_URL!, {
        authToken, // This enables RLS with the user's permissions
      });

      // Create drizzle instance with the authenticated connection
      db = drizzle(sql, { schema });
    } catch (error) {
      console.error('Failed to create authenticated DB connection:', error);
      // Fall back to admin connection
      db = defaultDb;
    }
  } else {
    // No auth token, use admin connection
    db = defaultDb;
  }

  // Create repository with the appropriate database connection
  const repository = new PeopleRepositoryPostgres(db);

  // Create and return the service
  const peopleService = new PeopleService(repository);
  return peopleService;
};
