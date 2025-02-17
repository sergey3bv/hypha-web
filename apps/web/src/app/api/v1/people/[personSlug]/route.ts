import { createPeopleService } from '@hypha-platform/core';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ personSlug: string }> },
) {
  const { personSlug } = await params;
  console.debug(`GET /api/v1/people/${personSlug}/`);
  try {
    const peopleService = createPeopleService();
    const response = await peopleService.findBySlug({ slug: personSlug });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch person:', error);
    return NextResponse.json(
      { error: 'Failed to fetch person' },
      { status: 500 },
    );
  }
}
