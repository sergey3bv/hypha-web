import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { people } from '@hypha-platform/storage-postgres';
import { drizzle } from 'drizzle-orm/neon-http';

import { eq, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const authToken = request.headers.get('Authorization')?.split(' ')[1] || '';

  const db = drizzle(
    neon(process.env.DEFAULT_DB_AUTHENTICATED_URL!, {
      authToken: authToken, // Pass the generated JWT here
    }),
  );

  const [user] = await db
    .select()
    .from(people)
    .where(sql`auth.user_id() = ${people.sub}`)
    .limit(1);

  return NextResponse.json({ user });
}
