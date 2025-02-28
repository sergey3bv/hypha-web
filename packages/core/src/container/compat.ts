/**
 * This file provides backward compatibility during migration.
 * It will be removed in a future version.
 */

import { getContainer } from './container-facade';
import { container } from './inversify.config';
import { Tokens } from './tokens';
import { SYMBOLS } from './types';
import { Repository } from './types';
import { RepositoryToken } from './repository-registry';
import { tokenToSymbolMap } from './types';
import { CoreConfig } from '../config/types';
import { DefaultContainer } from './container';

/**
 * Maps old tokens to new symbols for compatibility
 */
const tokenSymbolMap = new Map<symbol, symbol>([
  [Tokens.SpaceRepository, SYMBOLS.Repositories.SpaceRepository],
  [Tokens.SpaceConfigRepository, SYMBOLS.Repositories.SpaceConfigRepository],
  [Tokens.DocumentRepository, SYMBOLS.Repositories.DocumentRepository],
  [Tokens.PeopleRepository, SYMBOLS.Repositories.PeopleRepository],
  [Tokens.AgreementRepository, SYMBOLS.Repositories.AgreementRepository],
  [Tokens.MemberRepository, SYMBOLS.Repositories.MemberRepository],
  [Tokens.CommentRepository, SYMBOLS.Repositories.CommentRepository],
]);

/**
 * Provides compatibility for old getContainer call
 * @deprecated Use getContainer() from container-facade instead
 */
export function getCompatContainer(config: CoreConfig) {
  // Create a fake container that forwards calls to InversifyJS container
  const compatContainer = new DefaultContainer(config);

  // Override the get method to forward to InversifyJS
  compatContainer.get = (token: symbol) => {
    // Map old token to new symbol
    const symbol = tokenSymbolMap.get(token) || token;

    // Get from InversifyJS container
    return container.get(symbol);
  };

  return compatContainer;
}

/**
 * Compatibility function for getting repository implementation
 * @deprecated Use InversifyJS container directly
 */
export function getRepositoryImplementation<T extends Repository>(
  token: RepositoryToken<T>,
  storageType: string,
) {
  // Map old token to new symbol
  const symbol = tokenSymbolMap.get(token as unknown as symbol);
  if (!symbol) {
    throw new Error(`No symbol mapping found for token: ${token.toString()}`);
  }

  // Get from InversifyJS container
  return container.get(symbol) as T;
}
