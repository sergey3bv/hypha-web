# Next.js + Middy Middleware Architecture Setup

This document provides step-by-step instructions for setting up the middleware architecture that integrates Next.js with Middy.

## Installation

Install the required dependencies:

```bash
# Core Middy packages
npm install @middy/core

# Optional Middy middlewares (add as needed)
npm install @middy/http-json-body-parser @middy/validator @middy/error-logger
```

## Architecture Overview

This middleware architecture provides:

1. **Next.js Edge Middleware** - For client-side concerns like routing, auth, and internationalization
2. **Middy API Middleware** - For enhancing API route handlers with features like validation, error handling, etc.
3. **Unified middleware composition** - Easy composition of middleware chains

## File Structure

```
/src
  /middleware
    index.ts          - Main exports
    types.ts          - Type definitions
    middy.ts          - Middy adapters for Next.js
    next.ts           - Next.js middleware utilities
  middleware.ts       - Next.js Edge middleware configuration
```

## Using the Middleware

### For Next.js Edge Middleware

Edge middleware (runs on the Edge runtime) is configured in `src/middleware.ts`. It applies middleware to requests before they reach your application code.

To customize:

```typescript
// src/middleware.ts
import { composeMiddleware, corsMiddleware, loggingMiddleware, authMiddleware } from './middleware/next';

// Create a custom middleware chain
const middlewareChain = composeMiddleware([
  loggingMiddleware(),
  corsMiddleware(['https://example.com']), // Configure allowed origins
  authMiddleware(false), // Set to true to require auth for all routes
]);

export const middleware = middlewareChain;
```

### For API Routes (App Router)

Wrap your API handlers with Middy middleware:

```typescript
// src/app/api/example/route.ts
import { withMiddyRoute, withCommonMiddleware } from '../../../middleware/middy';

async function GET(request: Request, context: { params: Record<string, string> }) {
  // Your handler logic
  return new Response(JSON.stringify({ message: 'Hello World' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// Apply middleware
export const GET = withCommonMiddleware(withMiddyRoute(GET));
```

### Creating Custom Middleware

To create custom Middy middleware:

```typescript
// Example custom middleware for Middy
export function customMiddleware() {
  return {
    before: async (request) => {
      // Logic before handler
    },
    after: async (request) => {
      // Logic after handler
    },
    onError: async (request) => {
      // Error handling logic
    },
  };
}

// Use it in your API route
const handler = withMiddyRoute(myHandler).use(customMiddleware()).use(otherMiddleware());
```

## Troubleshooting

- If TypeScript errors occur with Middy, ensure `@types/aws-lambda` is installed even though we're not using AWS Lambda directly
- For issues with Next.js middleware, check that your matcher patterns in `middleware.ts` are correctly configured
- When working with binary data in API routes, adjust your middleware to handle binary responses properly
