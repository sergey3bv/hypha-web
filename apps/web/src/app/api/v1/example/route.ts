import { NextRequest } from 'next/server';

/**
 * GET handler for example API route
 */
export async function GET(request: Request | NextRequest): Promise<Response> {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'World';

  // Return JSON response
  return new Response(
    JSON.stringify({
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

/**
 * POST handler for example API route
 */
export async function POST(request: Request | NextRequest): Promise<Response> {
  try {
    // Parse request body
    const body = await request.json();

    // Process the data
    const processedData = {
      ...body,
      processedAt: new Date().toISOString(),
    };

    // Return JSON response
    return new Response(
      JSON.stringify({
        success: true,
        data: processedData,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({
        error: 'Failed to process request',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
