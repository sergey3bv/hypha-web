import { container } from './inversify.config';
import { Container } from 'inversify';
import { DatabaseProvider } from './database-provider';

/**
 * Get the global InversifyJS container
 */
export function getContainer(): Container {
  return container;
}

/**
 * Create a scoped container for a specific request context
 */
export function createRequestScope(context: { authToken?: string } = {}) {
  // Create a new container for the request scope
  const container = getContainer();
  const dbProvider = container.get(DatabaseProvider);
  dbProvider.configureUser({ authToken: context.authToken });
  return container;
}
