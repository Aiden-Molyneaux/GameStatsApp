import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.on('connect', () => {
  console.log('-> Database Connection SUCCESS');
});

pool.on('error', (err) => {
  console.error('-> Database Connection ERROR: unexpected error on idle client', err as Error);
  process.exit(-1);
});

export default pool;