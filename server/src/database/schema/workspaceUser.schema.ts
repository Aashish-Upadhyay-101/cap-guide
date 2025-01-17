import {
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import users from "./user.schema";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import workspaces from "./workspace.schema";

export const userRoleEnum = pgEnum("user_role", ["OWNER", "ADMIN", "MEMBER"]);

const workspaceUsers = pgTable(
  "workspace_users",
  {
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    role: userRoleEnum().default("OWNER").notNull(),
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

export type WorkspaceUserSelect = InferSelectModel<typeof workspaceUsers>;
export type WorkspaceUserInsert = InferInsertModel<typeof workspaceUsers>;

export default workspaceUsers;
