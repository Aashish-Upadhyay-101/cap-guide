import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/catch-async-error";
import WorkspaceService from "./workspace.service";
import {
  CreateWorkspaceUserDTO,
  ZCreateWorkspaceSchema,
} from "./workspace.dto";
import logger from "../../config/logger";

class WorkspaceController {
  private workspaceService: WorkspaceService;

  constructor(workspaceService: WorkspaceService) {
    this.workspaceService = workspaceService;
  }

  public createWorkspace = catchAsyncError(
    async (req: Request, res: Response) => {
      const data = req.body;
      const createWorkspaceDTO = ZCreateWorkspaceSchema.parse(data);

      const workspace = await this.workspaceService.createWorkspace(
        createWorkspaceDTO,
      );

      const createWorkspaceUserDTO: CreateWorkspaceUserDTO = {
        userId: req.user?.id as string,
        workspaceId: workspace.id,
        role: "OWNER",
      };

      const workspaceUser = await this.workspaceService.createWorkspaceUser(
        createWorkspaceUserDTO,
      );

      const responseData = {
        ...workspace,
        createdBy: workspaceUser.userId,
      };

      logger.info("Workspace created successfully", { data: responseData });

      res.status(201).json({
        message: "SUCCESS",
        data: responseData,
      });
    },
  );

  public getWorkspace() {}

  public updateWorkspace() {}

  public deleteWorkspace() {}

  public addWorkspaceMember() {}

  public removeWorkspaceMember() {}

  public updateWorkspaceMemberRole() {}
}

export default WorkspaceController;
