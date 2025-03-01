# Next.js + Middy Middleware Architecture

This middleware architecture integrates Next.js with Middy to provide a robust and flexible middleware system for both client-side and API routes.

## Architecture Overview

![Architecture Diagram](https://via.placeholder.com/800x400?text=Next.js+Middy+Middleware+Architecture)

This architecture consists of two main components:

1. **Next.js Edge Middleware** - For handling client-side concerns

   - Routing
   - Authentication
   - Internationalization
   - CORS
   - Logging

2. **Middy API Middleware** - For enhancing API route handlers
   - Request/response processing
   - Error handling
   - Validation
   - Logging
   - CORS

## Key Components

### `index.ts`

The main export file that provides access to all middleware utilities.

### `types.ts`

Contains TypeScript type definitions for the middleware system, ensuring type safety across the application.

### `next.ts`

Provides utilities for Next.js Edge Middleware, including:

- `composeMiddleware`: Composes multiple middleware functions into a single function
- `authMiddleware`: Handles authentication
- `loggingMiddleware`: Logs requests
- `corsMiddleware`: Handles CORS for client-side requests

### `middy.ts`

Adapts Middy for use with Next.js API routes:

- `withMiddyApi`: Wraps Page Router API handlers
- `withMiddyRoute`: Wraps App Router API handlers
- `withCommonMiddleware`: Applies common middleware to all API handlers
- Common middleware implementations (CORS, error handling, logging)

## Usage Examples

### Edge Middleware (Client-side)

```typescript
// src/middleware.ts
import { composeMiddleware, corsMiddleware, loggingMiddleware, authMiddleware } from './middleware/next';

export const middleware = composeMiddleware([loggingMiddleware(), corsMiddleware(), authMiddleware(true)]);
```

### API Routes (App Router)

```typescript
// src/app/api/example/route.ts
import { withMiddyRoute, withCommonMiddleware } from '../../../middleware/middy';

async function GET(request: Request) {
  return new Response(JSON.stringify({ message: 'Hello World' }));
}

export const GET = withCommonMiddleware(withMiddyRoute(GET));
```

### API Routes (Pages Router)

```typescript
// src/pages/api/example.ts
import { withMiddyApi, withCommonMiddleware } from '../../middleware/middy';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Hello World' });
}

export default withCommonMiddleware(withMiddyApi(handler));
```

## Custom Middleware

You can create custom middleware for both Edge and API routes:

### Custom Edge Middleware

```typescript
export function myEdgeMiddleware(): NextMiddlewareFunction {
  return async (request: NextRequest) => {
    // Custom logic
    return NextResponse.next();
  };
}
```

### Custom Middy Middleware

```typescript
export function myMiddyMiddleware() {
  return {
    before: async (request) => {
      // Before handler logic
    },
    after: async (request) => {
      // After handler logic
    },
  };
}
```

## Benefits

- **Type Safety**: Full TypeScript support
- **Composition**: Easy middleware composition
- **Reusability**: Shared middleware between different parts of the application
- **Separation of Concerns**: Clear separation between Edge and API middleware
- **Extensibility**: Easy to add new middleware
