import { defaultConfig } from '../../config/defaults';
import { getContainer } from '../../container';
import { SpaceConfigService } from './service';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema, db as defaultDb } from '@hypha-platform/storage-postgres';
import { SpaceConfigPostgresRepository } from './repository-postgres';
import { SpaceConfigRepository } from './repository';
import { Tokens } from '../../container/tokens';

type CreateSpaceConfigServiceProps = {
  config?: typeof defaultConfig;
  authToken?: string;
};

export const createSpaceConfigService = ({
  config = defaultConfig,
  authToken,
}: CreateSpaceConfigServiceProps = {}) => {
  // Get the container
  const container = getContainer(config);

  // Create a new repository with the authenticated connection if token is provided
  if (authToken) {
    try {
      // Create Neon connection with auth token for RLS
      const sql = neon(process.env.DEFAULT_DB_AUTHENTICATED_URL!, {
        authToken, // This enables RLS with the user's permissions
      });

      // Create drizzle instance with the authenticated connection
      const db = drizzle(sql, { schema });

      // Create a repository with the authenticated connection
      const repository = new SpaceConfigPostgresRepository(db);

      // Create and return service with the repository
      return new SpaceConfigService(repository);
    } catch (error) {
      console.error('Failed to create authenticated DB connection:', error);
      // Fall back to standard container approach
    }
  }

  // Default approach - get the repository from the container
  const repository = container.get(
    Tokens.SpaceConfigRepository,
  ) as SpaceConfigRepository;
  return new SpaceConfigService(repository);
};
