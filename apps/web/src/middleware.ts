import {
  composeMiddleware,
  corsMiddleware,
  loggingMiddleware,
  authMiddleware,
} from './middleware/next';

// Import i18n middleware
import { middleware as i18nMiddleware } from '@hypha-platform/i18n';

// Create a middleware chain with composed middleware
const middlewareChain = composeMiddleware([
  loggingMiddleware(),
  corsMiddleware(),
  // The i18n middleware must be called after CORS but before auth
  i18nMiddleware,
  // Add auth middleware with routes that don't require auth can be added here
  authMiddleware(false), // Enable auth for all routes by default
]);

// Export the middleware chain as the main middleware
export const middleware = middlewareChain;

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|placeholder|.well-known|_next/static|_next/image|favicon.ico).*)',
  ],
};
