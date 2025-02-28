/**
 * Container bootstrapping module.
 * This initializes the InversifyJS container with all necessary bindings.
 */

import { container } from './inversify.config';
import { createRepositoryModule } from './repository.module';
import { initializeTokenMapping } from './token-mapping';
import { SYMBOLS } from './types';
import { CoreConfig } from '../config/types';
import { DatabaseProvider } from './database-provider';
import { db as defaultDb } from '@hypha-platform/storage-postgres';

/**
 * Initialize the container with all required dependencies.
 * This should be called at application startup.
 */
export function initializeContainer(config: CoreConfig): void {
  // Register core configuration
  container.bind<CoreConfig>(SYMBOLS.StorageType).toConstantValue(config);

  // Register database connections
  container.bind(SYMBOLS.Database.AdminConnection).toConstantValue(defaultDb);

  // Register the database provider
  container.bind(DatabaseProvider).toSelf().inSingletonScope();

  // Initialize token mapping for backward compatibility
  initializeTokenMapping();

  // Load repository module
  container.load(createRepositoryModule());

  console.log('Container initialized with InversifyJS');
}
