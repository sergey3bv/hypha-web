import { createSpaceService } from '@hypha-platform/core/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const spaceService = createSpaceService();
    const spaces = await spaceService.getAll();
    return NextResponse.json(spaces);
  } catch (error) {
    console.error('Failed to fetch spaces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spaces' },
      { status: 500 },
    );
  }
}
