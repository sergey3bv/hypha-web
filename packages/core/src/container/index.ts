// New exports
export {
  getContainer,
  configureContainer,
  createRequestScope,
} from './container-facade';
export { SYMBOLS } from './types';
export {
  DatabaseProvider,
  UserDatabaseOptions,
  DatabaseInstance,
} from './database-provider';
export { initializeContainer } from './bootstrap';

// Legacy exports - marked as deprecated
/**
 * @deprecated Use getContainer() from container-facade instead
 */
export * from './provider';

/**
 * @deprecated Use SYMBOLS from types instead
 */
export { Tokens } from './tokens';

/**
 * @deprecated This will be removed in the next version
 */
export * from './types';

/**
 * @deprecated This will be removed in the next version
 */
export * from './compat';
