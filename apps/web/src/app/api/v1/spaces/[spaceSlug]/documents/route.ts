import { NextRequest, NextResponse } from 'next/server';

import { createDocumentService } from '@hypha-platform/core';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceSlug: string }> },
) {
  const { spaceSlug } = await params;

  // Get token from Authorization header

  const authToken = request.headers.get('Authorization')?.split(' ')[1] || '';
  try {
    const documentsService = createDocumentService();

    // Get URL parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

    const members = await documentsService.getAllBySpaceSlug({ spaceSlug });

    return NextResponse.json(members);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 },
    );
  }
}
