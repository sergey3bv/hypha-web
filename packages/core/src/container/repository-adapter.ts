/**
 * This file contains the adapter for the legacy repository registry.
 * It allows code using the old getRepositoryImplementation function to
 * continue working while we migrate to the InversifyJS container.
 */

import { StorageType } from '../config/types';
import { Repository, RepositoryToken } from './types';
import { StorageContext } from './inversify.config';
import { getRepositoryFromContainer } from './token-mapping';

/**
 * Adapter function that maintains backward compatibility with the old
 * getRepositoryImplementation function while using the new InversifyJS container.
 *
 * @deprecated Use direct container injection instead
 */
export function getRepositoryImplementation<T extends Repository>(
  token: RepositoryToken<T>,
  storageType: StorageType,
): T {
  // Set the storage context for the container
  StorageContext.storageType = storageType;

  // Get the repository from the container
  return getRepositoryFromContainer(token);
}
