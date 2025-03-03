import { NextRequest, NextResponse } from 'next/server';
import { createPeopleService } from '@hypha-platform/core';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
} as const;

export async function GET(request: NextRequest) {
  try {
    const authToken = request.headers.get('Authorization')?.split(' ')[1] || '';
    if (!authToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        {
          status: 401,
          headers: NO_CACHE_HEADERS,
        },
      );
    }

    // Get the PeopleService using the factory method and pass the auth token
    const peopleService = createPeopleService({ authToken });

    // Get the current user using the new findMe method
    const user = await peopleService.findMe();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        {
          status: 404,
          headers: NO_CACHE_HEADERS,
        },
      );
    }

    return NextResponse.json(
      { ...user },
      {
        headers: NO_CACHE_HEADERS,
      },
    );
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: NO_CACHE_HEADERS,
      },
    );
  }
}

export const revalidate = 0;
