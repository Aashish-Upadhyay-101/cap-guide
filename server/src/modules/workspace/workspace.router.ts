import BaseRouter from "../core/base.router";

class WorkspaceRouter extends BaseRouter {
  private workspaceController: WorkspaceController;

  constructor(workspaceController: WorkspaceController) {
    super();

    this.workspaceController = workspaceController;

    this.setRoutes((router) => {
      router.get("/:id", this.workspaceController.getWorkspace);
      router.post("/:id", this.workspaceController.createWorkspace);
      router.patch("/:id", this.workspaceController.updateWorkspace);
      router.delete("/:id", this.workspaceController.deleteWorkspace);
      router.post("/:id/member", this.workspaceController.addWorkspaceMember);
      router.delete(
        "/:id/member/:memberId",
        this.workspaceController.removeWorkspaceMember,
      );
      router.patch(
        "/:id/member/:memberId",
        this.workspaceController.updateWorkspaceMemberRole,
      );
    });
  }
}

export default WorkspaceRouter;
