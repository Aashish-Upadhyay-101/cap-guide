import { eq } from "drizzle-orm";
import db from "../../config/db";
import workspaces, {
  WorkspaceInsert,
  WorkspaceSelect,
} from "../../database/schema/workspace.schema";
import workspaceUsers, {
  WorkspaceUserInsert,
} from "../../database/schema/workspaceUser.schema";
import { CreateWorkspaceUserDTO } from "./workspace.dto";

interface IWorkspaceRepository {
  createWorkspace(name: string): Promise<WorkspaceInsert>;
  getWorkspaceById(id: string): Promise<WorkspaceSelect>;
  updateWorkspace(): void;
  deleteWorkspace(): void;
  createWorkspaceUser(
    newWorkspaceUser: CreateWorkspaceUserDTO,
  ): Promise<WorkspaceUserInsert>;
}

class WorkspaceRepository implements IWorkspaceRepository {
  public async createWorkspace(name: string): Promise<WorkspaceInsert> {
    const workspace = await db
      .insert(workspaces)
      .values({
        name: name,
      })
      .returning()
      .then((row) => row[0]);

    return workspace;
  }

  public async getWorkspaceById(id: string): Promise<WorkspaceSelect> {
    const workspace = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, id))
      .limit(1)
      .then((row) => row[0]);

    return workspace;
  }

  public updateWorkspace(): void {}
  public deleteWorkspace(): void {}

  public async createWorkspaceUser(
    newWorkspaceUser: CreateWorkspaceUserDTO,
  ): Promise<WorkspaceUserInsert> {
    const workspaceUser = await db
      .insert(workspaceUsers)
      .values({
        userId: newWorkspaceUser.userId,
        workspaceId: newWorkspaceUser.workspaceId,
        role: newWorkspaceUser.role,
      })
      .returning()
      .then((row) => row[0]);

    return workspaceUser;
  }
}

export default WorkspaceRepository;
