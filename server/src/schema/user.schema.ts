import {
  varchar,
  text,
  boolean,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";
import cuid from "@server/utils/cuid";

export const user = pgTable("users", {
  id: cuid("id").primaryKey(),
  firstName: varchar("first_name", { length: 35 }).notNull(),
  lastName: varchar("last_name", { length: 35 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash"),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").default(false),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .default(new Date())
    .$onUpdate(() => new Date()),
});
