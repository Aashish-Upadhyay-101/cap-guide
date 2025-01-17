import { z } from "zod";

export const ZCreateWorkspaceSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long"),
});

export const ZCreateWorkspaceUserSchema = z.object({
  userId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  role: z.enum(["ADMIN", "OWNER", "MEMBER"]).default("OWNER"),
});

export interface WorkspaceDTO {
  id: string;
  name: string;
}

export type CreateWorkspaceDTO = z.infer<typeof ZCreateWorkspaceSchema>;
export type CreateWorkspaceUserDTO = z.infer<typeof ZCreateWorkspaceUserSchema>;
