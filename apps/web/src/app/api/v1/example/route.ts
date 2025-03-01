import { withMiddyRoute, withCommonMiddleware } from '@web/middleware/middy';

/**
 * GET handler for example API route
 */
async function GET(
  request: Request,
  context: { params: Record<string, string | string[]> },
) {
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
async function POST(
  request: Request,
  context: { params: Record<string, string | string[]> },
) {
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
    // If error occurs, it will be handled by errorHandlerMiddleware
    throw new Error('Failed to process request');
  }
}

// Apply Middy middleware to handlers
export const GET_handler = withCommonMiddleware(withMiddyRoute(GET));
export const POST_handler = withCommonMiddleware(withMiddyRoute(POST));

// Export handlers for Next.js App Router
export { GET_handler as GET, POST_handler as POST };
