import { NextRequest, NextResponse } from 'next/server';

import { createSpaceService } from '@hypha-platform/core';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ spaceSlug: string }> },
) {
  const { spaceSlug } = await params;
  try {
    const peopleService = createSpaceService();
    const response = await peopleService.getBySlug({ slug: spaceSlug });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 },
    );
  }
}
