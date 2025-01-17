import db from "../../config/db";
import workspaces, {
  WorkspaceInsert,
} from "../../database/schema/workspace.schema";

interface IWorkspaceRepository {
  createWorkspace(newWorkspace: WorkspaceInsert): Promise<WorkspaceInsert>;
  getWorkspaceById(): void;
  updateWorkspace(): void;
  deleteWorkspace(): void;
}

class WorkspaceRepository implements IWorkspaceRepository {
  public async createWorkspace(
    newWorkspace: WorkspaceInsert,
  ): Promise<WorkspaceInsert> {
    const workspace = await db
      .insert(workspaces)
      .values({
        name: newWorkspace.name,
      })
      .returning()
      .then((row) => row[0]);

    return workspace;
  }
  public getWorkspaceById(): void {}
  public updateWorkspace(): void {}
  public deleteWorkspace(): void {}
}
