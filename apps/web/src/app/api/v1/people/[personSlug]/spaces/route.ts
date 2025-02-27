import { createPeopleService, createSpaceService } from '@hypha-platform/core';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ personSlug: string }> },
) {
  const { personSlug } = await params;
  console.debug(`GET /api/v1/people/${personSlug}/spaces`);
  try {
    // First, get the person by slug
    const peopleService = createPeopleService();
    const person = await peopleService.findBySlug({ slug: personSlug });

    // Then, get all spaces for this person using their ID
    const spaceService = createSpaceService();
    const spaces = await spaceService.getAllByMemberId(person.id);

    return NextResponse.json(spaces);
  } catch (error) {
    console.error('Failed to fetch spaces for person:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spaces for person' },
      { status: 500 },
    );
  }
}
