import {
  pgTable,
  varchar,
  text,
  boolean,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import accounts from "./account.schema";
import workspaceUsers from "./workspaceUser.schema";

const users = pgTable(
  "users",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    firstName: varchar("first_name", { length: 35 }).notNull(),
    lastName: varchar("last_name", { length: 35 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash"),
    avatarUrl: text("avatar_url"),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date()),
  },
  (users) => [uniqueIndex("email_idx").on(users.email)],
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  workspaceUsers: many(workspaceUsers),
}));

export default users;

export type UserSelect = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;
