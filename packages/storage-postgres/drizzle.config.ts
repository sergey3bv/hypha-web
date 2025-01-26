import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL;
if (!url) throw new Error(`Connection string to Postgres not found.`);

export default defineConfig({
  dbCredentials: { url },
  dialect: 'postgresql',
  out: './migrations',
  schema: './src/schema/index.ts',
});
