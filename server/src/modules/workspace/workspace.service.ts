import { CreateWorkspaceDTO, WorkspaceDTO } from "./workspace.dto";
import WorkspaceRepository from "./workspace.repository";

class WorkspaceService {
  private workspaceRepository: WorkspaceRepository;

  constructor(workspaceRepository: WorkspaceRepository) {
    this.workspaceRepository = workspaceRepository;
  }

  public async createWorkspace(dto: CreateWorkspaceDTO): Promise<WorkspaceDTO> {
    const workspace = await this.workspaceRepository.createWorkspace(dto);
    const workspaceDTO: WorkspaceDTO = {
      id: workspace.id as string,
      name: workspace.name,
    };

    return workspaceDTO;
  }

  public getWorkspace() {}

  public updateWorkspace() {}

  public deleteWorkspace() {}

  public addWorkspaceMember() {}

  public removeWorkspaceMember() {}

  public updateWorkspaceMemberRole() {}
}
