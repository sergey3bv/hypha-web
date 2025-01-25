import { defaultRepositoryMap } from '../config/defaults';
import { StorageType } from '../config/types';
import { Repository } from './types';

// Type to ensure repository token matches repository type
export type RepositoryToken<T extends Repository> = symbol & { __type: T };

export function getRepositoryImplementation<T extends Repository>(
  token: RepositoryToken<T>,
  storageType: StorageType,
): T {
  const implementations = defaultRepositoryMap.get(token);
  if (!implementations) {
    throw new Error(`No implementations found for token: ${token.toString()}`);
  }

  const Implementation = implementations[storageType];
  if (!Implementation) {
    throw new Error(
      `No implementation found for storage type ${storageType} and token ${token.toString()}`,
    );
  }

  return new Implementation() as T;
}
