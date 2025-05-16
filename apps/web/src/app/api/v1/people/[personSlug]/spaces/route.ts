import {
  createPeopleService,
  createSpaceService,
} from '@hypha-platform/core/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ personSlug: string }> },
) {
  const { personSlug } = await params;
  console.debug(`GET /api/v1/people/${personSlug}/spaces`);

  const authToken = request.headers.get('Authorization')?.split(' ')[1] || '';

  if (!authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // First, get the person by slug
    const peopleService = createPeopleService({ authToken });
    const person = await peopleService.findBySlug({ slug: personSlug });

    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }

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
