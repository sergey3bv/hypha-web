import { ContainerModule } from 'inversify';
import { defaultRepositoryMap } from '../config/defaults';
import { Repository, RepositoryToken } from './types';
import { StorageContext } from './inversify.config';

/**
 * Creates a container module that registers all repositories with their corresponding
 * storage-specific implementations.
 */
export function createRepositoryModule(): ContainerModule {
  return new ContainerModule((bind) => {
    // Register all repositories from the default repository map
    for (const [token, implementations] of defaultRepositoryMap.entries()) {
      registerRepositoryToken(bind, token, implementations);
    }
  });
}

/**
 * Registers a repository token with its implementations for different storage types.
 * Uses a factory function that selects the appropriate implementation based on the current storage type.
 */
function registerRepositoryToken<T extends Repository>(
  bind: any, // Using any for now to avoid type issues
  token: RepositoryToken<T>,
  implementations: Record<string, new (...args: any[]) => T>,
): void {
  bind(token).toDynamicValue(() => {
    const storageType = StorageContext.storageType;

    if (!storageType) {
      throw new Error('Storage type not set in StorageContext');
    }

    const Implementation = implementations[storageType];

    if (!Implementation) {
      throw new Error(
        `No implementation found for storage type ${storageType} and token ${token.toString()}`,
      );
    }

    return new Implementation();
  });
}
