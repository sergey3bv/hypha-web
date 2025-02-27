import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: NextRequest) {
  const sql = neon(process.env.DEFAULT_DB_AUTHENTICATED_URL!, {
    authToken: request.headers.get('Authorization')?.split(' ')[1] || '',
  });
  const user = await sql`SELECT * FROM auth.user_id()`;
  return NextResponse.json({ user });
}
