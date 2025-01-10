import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import workspaceUsers from "./workspaceUser.schema";

const workspaces = pgTable("workspaces", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 35 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),

  // note: everything will be scoped within teams and not user
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  workspaceUsers: many(workspaceUsers),
}));

export default workspaces;
