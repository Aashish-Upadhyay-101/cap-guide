interface IWorkspaceRepository {
  createWorkspace(): void;
  getWorkspaceById(): void;
  updateWorkspace(): void;
  deleteWorkspace(): void;
}

class WorkspaceRepository implements IWorkspaceRepository {
  public createWorkspace(): void {}
  public getWorkspaceById(): void {}
  public updateWorkspace(): void {}
  public deleteWorkspace(): void {}
}
