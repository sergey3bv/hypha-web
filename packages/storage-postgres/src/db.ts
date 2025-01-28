import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { WebSocket } from 'ws';

import { loadEnvConfig } from '@next/env';
import path from 'path';

const cwd = path.join(process.cwd(), '../../');

const { combinedEnv } = loadEnvConfig(cwd);

const connectionString =
  combinedEnv?.BRANCH_DB_URL || combinedEnv?.DEFAULT_DB_URL;

if (!connectionString) {
  throw new Error(
    'db connectionString (BRANCH_DB_URL or DEFAULT_DB_URL) is not set',
  );
}

if (process.env.NODE_ENV === 'production') {
  neonConfig.webSocketConstructor = WebSocket;
  neonConfig.poolQueryViaFetch = true;
} else {
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

const pool = new Pool({ connectionString });

export const db = drizzle(pool);
