import { fetchSpaceMemberBySpaceSlug } from '@hypha-platform/epics';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceSlug: string }> },
) {
  const { spaceSlug } = await params;
  console.debug(`GET /api/v1/spaces/${spaceSlug}/members/`);
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const response = await fetchSpaceMemberBySpaceSlug(
      { spaceSlug: spaceSlug },
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
