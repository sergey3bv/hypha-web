// src/db.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const url = process.env.POSTGRES_URL;

console.debug('POSTGRES_URL', url);

if (!url) {
  throw new Error('POSTGRES_URL is not set');
}

const sql = neon(url);
export const db = drizzle({ client: sql });
