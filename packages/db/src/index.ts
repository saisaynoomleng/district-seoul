import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import env from './env';

const globalForDB = globalThis as {
  pool?: Pool;
};

const pool =
  globalForDB.pool ?? new Pool({ connectionString: env.DATABASE_URL, max: 20 });

if (process.env.NODE_ENV !== 'production') {
  globalForDB.pool = pool;
}

export const db = drizzle({ client: pool, logger: true });
export * from './db/schema';
