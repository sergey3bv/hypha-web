/**
 * This file contains utilities for mapping between the old token system
 * and the new InversifyJS symbol-based system. It's used during the migration
 * to ensure backward compatibility.
 */

import { Tokens } from './tokens';
import {
  SYMBOLS,
  tokenToSymbolMap,
  RepositoryToken,
  Repository,
} from './types';
import { container } from './inversify.config';

/**
 * Initialize the mapping between old repository tokens and new symbols.
 * This should be called during application startup.
 */
export function initializeTokenMapping(): void {
  // Map existing tokens to new symbols
  tokenToSymbolMap.set(
    Tokens.SpaceRepository,
    SYMBOLS.Repositories.SpaceRepository,
  );
  tokenToSymbolMap.set(
    Tokens.SpaceConfigRepository,
    SYMBOLS.Repositories.SpaceConfigRepository,
  );
  tokenToSymbolMap.set(
    Tokens.DocumentRepository,
    SYMBOLS.Repositories.DocumentRepository,
  );
  tokenToSymbolMap.set(
    Tokens.PeopleRepository,
    SYMBOLS.Repositories.PeopleRepository,
  );

  // Map additional tokens if they exist as repository tokens
  if (Tokens.AgreementRepository) {
    tokenToSymbolMap.set(
      Tokens.AgreementRepository as RepositoryToken<Repository>,
      SYMBOLS.Repositories.AgreementRepository,
    );
  }

  if (Tokens.MemberRepository) {
    tokenToSymbolMap.set(
      Tokens.MemberRepository as RepositoryToken<Repository>,
      SYMBOLS.Repositories.MemberRepository,
    );
  }

  if (Tokens.CommentRepository) {
    tokenToSymbolMap.set(
      Tokens.CommentRepository as RepositoryToken<Repository>,
      SYMBOLS.Repositories.CommentRepository,
    );
  }
}

/**
 * Get the InversifyJS symbol for a repository token.
 * @param token The old repository token
 * @returns The InversifyJS symbol for the token
 */
export function getSymbolForToken<T extends Repository>(
  token: RepositoryToken<T>,
): symbol {
  const symbol = tokenToSymbolMap.get(token);
  if (!symbol) {
    throw new Error(`No symbol mapping found for token: ${token.toString()}`);
  }
  return symbol;
}

/**
 * Get a repository from the container using an old-style token.
 * This is a compatibility function during migration.
 * @param token The old repository token
 * @returns The repository instance
 */
export function getRepositoryFromContainer<T extends Repository>(
  token: RepositoryToken<T>,
): T {
  const symbol = getSymbolForToken(token);
  return container.get<T>(symbol);
}
