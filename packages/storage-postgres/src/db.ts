import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { WebSocket } from 'ws';

import { loadEnvConfig } from '@next/env';
import path from 'path';

const cwd = path.join(process.cwd(), '../../');

const { combinedEnv, parsedEnv, loadedEnvFiles } = loadEnvConfig(cwd);

console.debug('db.ts', { combinedEnv, parsedEnv, loadedEnvFiles });

const connectionString = combinedEnv?.DATABASE_URL;
const nodeEnv = combinedEnv?.NODE_ENV;
console.debug('DB', { connectionString, nodeEnv });

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
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
