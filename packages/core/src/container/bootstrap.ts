/**
 * Container bootstrapping module.
 * This initializes the InversifyJS container with all necessary bindings.
 */

import { container } from './inversify.config';
import { SYMBOLS } from './types';
import { CoreConfig } from '../config/types';
import { db as defaultDb } from '@hypha-platform/storage-postgres';
import { PeopleService } from '../components/people/service';
import { SpaceService } from '../components/space/service';
import { DocumentService } from '../components/governance/service';
import { SpaceConfigService } from '../components/space-config/service';
import { PeopleRepositoryPostgres } from '../components/people/repository-postgres';
import { SpacePostgresRepository } from '../components/space/repository-postgres';
import { DocumentRepositoryPostgres } from '../components/governance/repository-postgres';
import { SpaceConfigPostgresRepository } from '../components/space-config/repository-postgres';

/**
 * Initialize the container with all required dependencies.
 * This should be called at application startup.
 */
export function initializeContainer(config: CoreConfig): void {
  // Register core configuration
  container.bind<CoreConfig>(SYMBOLS.StorageType).toConstantValue(config);

  // Register database connections
  container.bind(SYMBOLS.Database.AdminConnection).toConstantValue(defaultDb);

  // Register repositories with their symbols
  container
    .bind(SYMBOLS.Repositories.PeopleRepository)
    .to(PeopleRepositoryPostgres)
    .inSingletonScope();
  container
    .bind(SYMBOLS.Repositories.SpaceRepository)
    .to(SpacePostgresRepository)
    .inSingletonScope();
  container
    .bind(SYMBOLS.Repositories.DocumentRepository)
    .to(DocumentRepositoryPostgres)
    .inSingletonScope();
  container
    .bind(SYMBOLS.Repositories.SpaceConfigRepository)
    .to(SpaceConfigPostgresRepository)
    .inSingletonScope();

  // Register services by their class type
  container.bind(PeopleService).toSelf().inTransientScope();
  container.bind(SpaceService).toSelf().inTransientScope();
  container.bind(DocumentService).toSelf().inTransientScope();
  container.bind(SpaceConfigService).toSelf().inTransientScope();

  console.log('Container initialized with InversifyJS');
}
