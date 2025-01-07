import { drizzle } from "drizzle-orm/postgres-js";
import { Pool } from "pg";
import * as schema from "../database/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, {
  schema,
  logger: true,
});

export default db;
