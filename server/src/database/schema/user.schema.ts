import {
  pgTable,
  varchar,
  text,
  boolean,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import accounts from "./account.schema";
import workspaceUsers from "./workspaceUser.schema";

const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    firstName: varchar("first_name", { length: 35 }).notNull(),
    lastName: varchar("last_name", { length: 35 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash"),
    passwordSalt: text("password_salt"),
    avatarUrl: text("avatar_url"),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .default(new Date())
      .$onUpdate(() => new Date()),
  },
  (users) => [uniqueIndex("email_idx").on(users.email)],
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  workspaceUsers: many(workspaceUsers),
}));

export default users;
