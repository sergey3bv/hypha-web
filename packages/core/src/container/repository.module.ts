import { ContainerModule } from 'inversify';
import { defaultRepositoryMap } from '../config/defaults';
import { Repository } from './types';
import { StorageContext } from './inversify.config';
import { getSymbolForToken } from './token-mapping';

/**
 * Creates a container module that registers all repositories with their corresponding
 * storage-specific implementations.
 */
export function createRepositoryModule(): ContainerModule {
  return new ContainerModule((bind) => {
    // Register all repositories from the default repository map
    for (const [token, implementations] of defaultRepositoryMap.entries()) {
      // Register with both the old token (for the adapter pattern) and the new symbol
      const symbol = getSymbolForToken(token);

      // Register repository implementation factories
      registerRepositoryImplementation(bind, token, implementations);
      registerRepositoryImplementation(bind, symbol, implementations);
    }
  });
}

/**
 * Registers a repository token with its implementations for different storage types.
 * Uses a factory function that selects the appropriate implementation based on the current storage type.
 */
function registerRepositoryImplementation<T extends Repository>(
  bind: any, // Using any for now to avoid type issues
  tokenOrSymbol: symbol,
  implementations: Record<string, new (...args: any[]) => T>,
): void {
  bind(tokenOrSymbol).toDynamicValue(() => {
    const storageType = StorageContext.storageType;

    if (!storageType) {
      throw new Error('Storage type not set in StorageContext');
    }

    const Implementation = implementations[storageType];

    if (!Implementation) {
      throw new Error(
        `No implementation found for storage type ${storageType} and token ${tokenOrSymbol.toString()}`,
      );
    }

    return new Implementation();
  });
}
