import TokenService from "../../utils/services/token.service";
import AuthMiddleware from "../auth/auth.middleware";
import BaseRouter from "../core/base.router";
import WorkspaceController from "./workspace.controller";
import WorkspaceRepository from "./workspace.repository";
import WorkspaceService from "./workspace.service";

class WorkspaceRouter extends BaseRouter {
  private workspaceRepository: WorkspaceRepository;
  private workspaceService: WorkspaceService;
  private workspaceController: WorkspaceController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    super();

    this.workspaceRepository = new WorkspaceRepository();
    this.workspaceService = new WorkspaceService(this.workspaceRepository);
    this.workspaceController = new WorkspaceController(this.workspaceService);
    this.authMiddleware = new AuthMiddleware();

    this.use([this.authMiddleware.protectRoute]);

    this.setRoutes((router) => {
      router.get("/", this.workspaceController.getAllUserWorkspaces);
      router.post("/", this.workspaceController.createWorkspace);
      router.get("/:id", this.workspaceController.getWorkspace);
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
