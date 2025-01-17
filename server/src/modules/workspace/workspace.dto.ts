import { z } from "zod";

export const ZCreateWorkspaceSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long"),
});

export interface WorkspaceDTO {
  id: string;
  name: string;
}

export type CreateWorkspaceDTO = z.infer<typeof ZCreateWorkspaceSchema>;
