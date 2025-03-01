import middy from '@middy/core';
import {
  NextApiHandler,
  NextRouteHandler,
  MiddyNextApiHandler,
  MiddyNextRouteHandler,
} from './types';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Wraps a Next.js API route handler with Middy middleware (Pages Router)
 * @param handler The Next.js API route handler
 * @returns A Middy-enhanced handler
 */
export function withMiddyApi<T = any>(
  handler: NextApiHandler<T>,
): MiddyNextApiHandler<T> {
  return middy((req: NextApiRequest, res: NextApiResponse<T>) => {
    return handler(req, res);
  });
}

/**
 * Wraps a Next.js App Router route handler with Middy middleware
 * @param handler The Next.js App Router route handler
 * @returns A Middy-enhanced handler
 */
export function withMiddyRoute(
  handler: NextRouteHandler,
): MiddyNextRouteHandler {
  return middy(
    (
      request: Request,
      context: { params: Record<string, string | string[]> },
    ) => {
      return handler(request, context);
    },
  );
}

/**
 * Common middleware for all API routes
 * @param handler The Middy handler to enhance
 * @returns Enhanced Middy handler with common middleware
 */
export function withCommonMiddleware<T>(
  handler: MiddyNextApiHandler<T> | MiddyNextRouteHandler,
) {
  return handler
    .use(corsMiddleware())
    .use(errorHandlerMiddleware())
    .use(loggerMiddleware());
}

/**
 * CORS middleware for Middy handlers
 */
export function corsMiddleware() {
  return {
    before: async (request: any) => {
      // For Pages Router
      if (request.event.headers && request.response) {
        const res: NextApiResponse = request.response;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, DELETE, OPTIONS',
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        );
      }
    },
    after: async (request: any) => {
      // For App Router
      if (request.response instanceof Response) {
        const response = request.response as Response;
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, DELETE, OPTIONS',
        );
        newHeaders.set(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        );

        request.response = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      }
    },
  };
}

/**
 * Error handler middleware for Middy
 */
export function errorHandlerMiddleware() {
  return {
    onError: async (request: any) => {
      console.error('Error in API route:', request.error);

      const statusCode = request.error.statusCode || 500;
      const message = request.error.message || 'Internal Server Error';

      // For Pages Router
      if (request.response && typeof request.response.status === 'function') {
        const res: NextApiResponse = request.response;
        return res.status(statusCode).json({ error: message });
      }

      // For App Router
      request.response = new Response(JSON.stringify({ error: message }), {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  };
}

/**
 * Logger middleware for Middy
 */
export function loggerMiddleware() {
  return {
    before: async (request: any) => {
      const timestamp = new Date().toISOString();

      // For Pages Router
      if (request.event && request.event.method) {
        console.log(
          `[${timestamp}] ${request.event.method} ${request.event.url}`,
        );
      }
      // For App Router
      else if (request.event instanceof Request) {
        console.log(
          `[${timestamp}] ${request.event.method} ${request.event.url}`,
        );
      }
    },
    after: async (request: any) => {
      const responseStatus =
        request.response?.status ||
        (request.response instanceof Response ? request.response.status : 200);
      console.log(`Response status: ${responseStatus}`);
    },
  };
}
