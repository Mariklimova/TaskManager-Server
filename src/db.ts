import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT_DB,
  password: process.env.PASSWORD,
  user: process.env.USER,
  database: process.env.DATABASE,
});

export default pool;
