import { drizzle } from "drizzle-orm/postgres-js";
import { Pool } from "pg";
import * as schema from "../schema";

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
});

const db = drizzle(pool, { schema });

export default db;
