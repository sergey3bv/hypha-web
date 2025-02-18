import { cache } from 'react';
import { Container } from './types';
import { DefaultContainer } from './container';
import { CoreConfig } from '../config/types';
import { Tokens } from './tokens';
import { getRepositoryImplementation } from './repository-registry';
import { SpaceConfigService } from '../components/space-config/service';

// Initialize container with repositories based on config
function initializeContainer(config: CoreConfig): Container {
  const container = new DefaultContainer(config);

  // Register repositories based on config
  container.register(
    Tokens.SpaceRepository,
    getRepositoryImplementation(Tokens.SpaceRepository, config.storage.space),
  );

  container.register(
    Tokens.SpaceConfigRepository,
    getRepositoryImplementation(Tokens.SpaceConfigRepository, 'postgres'),
  );

  container.register(
    Tokens.DocumentRepository,
    getRepositoryImplementation(Tokens.DocumentRepository, 'postgres'),
  );

  container.register(
    Tokens.PeopleRepository,
    getRepositoryImplementation(Tokens.PeopleRepository, 'postgres'),
  );

  return container;
}

// Cache the container initialization
export const getContainer = cache((config: CoreConfig): Container => {
  return initializeContainer(config);
});

// Helper to get scoped container for a specific space
export const getScopedContainer = cache(
  async (config: CoreConfig, spaceSlug?: string): Promise<Container> => {
    const container = getContainer(config);
    const scopedContainer = container.createScope();

    if (spaceSlug) {
      // Get space-specific storage configuration
      const spaceConfigService = new SpaceConfigService(container);
      const storageConfig = await spaceConfigService.getStorageConfig(
        spaceSlug,
      );

      // Register repositories with space-specific storage
      if (storageConfig.space) {
        scopedContainer.register(
          Tokens.SpaceRepository,
          getRepositoryImplementation(
            Tokens.SpaceRepository,
            storageConfig.space,
          ),
        );
      }
    }

    return scopedContainer;
  },
);
