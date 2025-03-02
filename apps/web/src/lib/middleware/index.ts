// Export middy middleware
export {
  withMiddyApi,
  withMiddyRoute,
  withCommonMiddleware,
  errorHandlerMiddleware,
  loggerMiddleware,
} from './middy';
// Export corsMiddleware from middy with a different name to avoid conflict
export { corsMiddleware as middyCorsMiddleware } from './middy';

// Export Next.js middleware wrappers
export {
  composeMiddleware,
  authMiddleware,
  loggingMiddleware,
  corsMiddleware as nextCorsMiddleware,
} from './next';
// Export type from next.ts
export type { NextMiddlewareChain } from './next';

// Export middleware types
export * from './types';
