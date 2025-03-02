import { container } from './inversify.config';
import { CoreConfig } from '../config/types';
import { SYMBOLS } from './types';
import { Container } from 'inversify';
import { DatabaseProvider } from './database-provider';

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
export function createRequestScope(context: { authToken?: string } = {}) {
  // Create a new container for the request scope
  const scopedContiner = new Container({ parent: container });
  scopedContiner.bind(DatabaseProvider).toSelf().inSingletonScope();

  const dbProvider = scopedContiner.get(DatabaseProvider);
  dbProvider.configureUser({ authToken: context.authToken });

  return scopedContiner;
}
