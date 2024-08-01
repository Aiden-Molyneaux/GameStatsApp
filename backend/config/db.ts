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
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err as Error);
  process.exit(-1);
});

// export function resetPool() {
//   return pool.end().then(() => {
//     console.log('Pool has been reset');
//     pool = new Pool({
//       user: process.env.DB_USER,
//       host: process.env.DB_HOST,
//       database: process.env.DB_NAME,
//       password: process.env.DB_PASSWORD,
//       port: Number(process.env.DB_PORT),
//     });

//     pool.on('connect', () => {
//       console.log('Connected to the database');
//     });

//     pool.on('error', (err) => {
//       console.error('Unexpected error on idle client', err as Error);
//       process.exit(-1);
//     });
//   }).catch((err) => {
//     console.error('Error resetting pool', err);
//   });
// }

// resetPool();

export default pool;