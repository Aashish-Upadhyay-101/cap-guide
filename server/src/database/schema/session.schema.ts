import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import users from "./user.schema";
import { relations } from "drizzle-orm";

const sessions = pgTable("sessions", {
  refreshToken: text("refresh_token").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export default sessions;
