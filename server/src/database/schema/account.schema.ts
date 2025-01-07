import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import users from "./user.schema";
import { relations } from "drizzle-orm";

const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    provider: varchar("provider", { length: 20 }),
    providerUserId: text("provider_user_id"),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (accounts) => [
    primaryKey({
      columns: [accounts.provider, accounts.providerUserId],
    }),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export default accounts;
