import { defaultConfig } from '../../config/defaults';
import { getContainer } from '../../container';
import { DocumentService } from './service';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema, db as defaultDb } from '@hypha-platform/storage-postgres';
import { DocumentRepositoryPostgres } from './repository-postgres';
import { DocumentRepository } from './repository';
import { Tokens } from '../../container/tokens';

type CreateDocumentServiceProps = {
  config?: typeof defaultConfig;
  authToken?: string;
};

export const createDocumentService = ({
  config = defaultConfig,
  authToken,
}: CreateDocumentServiceProps = {}) => {
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
      const repository = new DocumentRepositoryPostgres(db);

      // Create and return service with the repository
      return new DocumentService(repository);
    } catch (error) {
      console.error('Failed to create authenticated DB connection:', error);
      // Fall back to standard container approach
    }
  }

  // Default approach - get the repository from the container
  const repository = container.get(
    Tokens.DocumentRepository,
  ) as DocumentRepository;
  return new DocumentService(repository);
};
