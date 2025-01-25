import { defaultRepositoryMap } from '../config/defaults';
import { StorageType } from '../config/types';

export function getRepositoryImplementation(
  token: symbol,
  storageType: StorageType,
): any {
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

  return new Implementation();
}
