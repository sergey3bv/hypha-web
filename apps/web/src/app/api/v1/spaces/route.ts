import { readAllSpaces } from '@hypha-platform/epics';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const spaces = await readAllSpaces();
    return NextResponse.json(spaces);
  } catch (error) {
    console.error('Failed to fetch spaces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spaces' },
      { status: 500 },
    );
  }
}
