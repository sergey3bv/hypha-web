import { NextRequest, NextResponse } from 'next/server';
import { createPeopleService, createSpaceService } from '@hypha-platform/core';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceSlug: string }> },
) {
  const { spaceSlug } = await params;

  // Get token from Authorization header
  const authToken = request.headers.get('Authorization')?.split(' ')[1] || '';

  try {
    // Create the people service with the auth token to get members for this space
    const peopleService = createPeopleService({ authToken });

    // Get URL parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

    // Get members by space slug with pagination
    const response = await peopleService.findBySpaceSlug(
      { spaceSlug },
      { pagination: { page, pageSize } },
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 },
    );
  }
}
