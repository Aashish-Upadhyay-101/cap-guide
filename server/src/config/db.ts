import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../database/schema";

const queryClient = postgres(process.env.DATABASE_URL!);

const db = drizzle(queryClient, {
  schema,
  logger: true,
});

export default db;
