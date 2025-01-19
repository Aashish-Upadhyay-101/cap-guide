import { WorkspaceSelect } from "../../database/schema/workspace.schema";
import { WorkspaceUserSelect } from "../../database/schema/workspaceUser.schema";
import {
  CreateWorkspaceDTO,
  CreateWorkspaceUserDTO,
  WorkspaceDTO,
} from "./workspace.dto";
import WorkspaceRepository from "./workspace.repository";

class WorkspaceService {
  private workspaceRepository: WorkspaceRepository;

  constructor(workspaceRepository: WorkspaceRepository) {
    this.workspaceRepository = workspaceRepository;
  }

  public async createWorkspace(dto: CreateWorkspaceDTO): Promise<WorkspaceDTO> {
    const workspace = await this.workspaceRepository.createWorkspace(dto.name);

    const workspaceDTO: WorkspaceDTO = {
      id: workspace.id as string,
      name: workspace.name,
    };

    return workspaceDTO;
  }

  public async createWorkspaceUser(
    dto: CreateWorkspaceUserDTO,
  ): Promise<WorkspaceUserSelect> {
    const workspaceUser = (await this.workspaceRepository.createWorkspaceUser(
      dto,
    )) as WorkspaceUserSelect;

    return workspaceUser;
  }

  public async getWorkspace(id: string): Promise<WorkspaceDTO> {
    const workspace = await this.workspaceRepository.getWorkspaceById(id);

    const workspaceDTO: WorkspaceDTO = {
      id: workspace.id,
      name: workspace.name,
    };

    return workspaceDTO;
  }

  public async getAllUserWorkspaces(userId: string): Promise<WorkspaceDTO[]> {
    const userWorkspaces = await this.workspaceRepository.getAllUserWorkspaces(
      userId,
    );

    const userWorkspacesDTO: WorkspaceDTO[] = userWorkspaces.map(
      (userWorkspace) => ({
        id: userWorkspace.id,
        name: userWorkspace.name,
      }),
    );

    return userWorkspacesDTO;
  }

  public updateWorkspace() {}

  public deleteWorkspace() {}

  public addWorkspaceMember() {}

  public removeWorkspaceMember() {}

  public updateWorkspaceMemberRole() {}
}

export default WorkspaceService;
