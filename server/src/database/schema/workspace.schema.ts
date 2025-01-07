import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import workspaceUsers from "./workspaceUser.schema";

const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 35 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .default(new Date())
    .$onUpdate(() => new Date()),

  // note: everything will be scoped within teams and not user
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  workspaceUsers: many(workspaceUsers),
}));

export default workspaces;
