import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { people } from '@hypha-platform/storage-postgres';

export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get('Authorization')?.split(' ')[1] || '';
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = drizzle(
      neon(process.env.DEFAULT_DB_AUTHENTICATED_URL!, {
        authToken: authToken,
      }),
    );

    const body = await request.json();
    const {
      name,
      surname,
      email,
      avatarUrl,
      description,
      location,
      nickname,
      sub,
    } = body;

    if (!name || !surname || !nickname || !email || !sub) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const [newProfile] = await db
      .insert(people)
      .values({
        name,
        surname,
        email,
        avatarUrl,
        description,
        location,
        nickname,
        sub,
      })
      .returning();

    return NextResponse.json({ profile: newProfile }, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
