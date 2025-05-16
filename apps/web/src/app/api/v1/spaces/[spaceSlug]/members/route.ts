import { NextRequest, NextResponse } from 'next/server';
import { createSpaceService } from '@hypha-platform/core/server';
import { getSpaceDetails } from '@core/space';
import { publicClient } from '@core/common';
import { findPersonByAddresses } from '@core/people/server/queries';
import { db } from '@hypha-platform/storage-postgres';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceSlug: string }> },
) {
  const { spaceSlug } = await params;

  try {
    const spaceService = createSpaceService();

    const space = await spaceService.getBySlug({ slug: spaceSlug });
    if (!space) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    const spaceDetails = await publicClient.readContract(
      getSpaceDetails({ spaceId: BigInt(space.web3SpaceId as number) }),
    );

    const [, , , , members] = spaceDetails;

    console.log('spaceDetailsFromRoute', spaceDetails);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '4', 10);

    const result = await findPersonByAddresses(
      members as `0x${string}`[],
      { pagination: { page, pageSize } },
      { db },
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 },
    );
  }
}
