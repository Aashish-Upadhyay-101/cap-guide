import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import users from "./user.schema";
import { relations } from "drizzle-orm";
import workspaces from "./workspace.schema";

const workspaceUsers = pgTable(
  "workspace_users",
  {
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (workspaceUsers) => [
    primaryKey({
      columns: [workspaceUsers.userId, workspaceUsers.workspaceId],
    }),
  ],
);

export const workspaceUsersRelations = relations(workspaceUsers, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [workspaceUsers.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [workspaceUsers.userId],
    references: [users.id],
  }),
}));

export default workspaceUsers;
