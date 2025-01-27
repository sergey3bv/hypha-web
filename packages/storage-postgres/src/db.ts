import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { WebSocket } from 'ws';

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error('POSTGRES_URL is not set');
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
