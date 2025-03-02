import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import middy from '@middy/core';

// Next.js middleware types
export type NextMiddlewareFunction = (
  request: NextRequest,
  response?: NextResponse,
) => Promise<NextResponse | undefined> | NextResponse | undefined;

export interface NextMiddlewareContext {
  request: NextRequest;
  response?: NextResponse;
}

// API route handler types for Next.js Pages Router
export type NextApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
) => unknown | Promise<unknown>;

// API route handler types for Next.js App Router
export type NextRouteHandler = (
  request: Request,
  context: { params: Record<string, string | string[]> },
) => Promise<Response> | Response;

// Middy handler types for Next.js
export type MiddyNextApiHandler<T = any> = middy.MiddyfiedHandler<
  NextApiRequest,
  NextApiResponse<T>
>;

export type MiddyNextRouteHandler = middy.MiddyfiedHandler<Request, Response>;

// Error handler type
export interface ApiError extends Error {
  statusCode?: number;
}
