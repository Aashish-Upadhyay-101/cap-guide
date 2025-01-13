import { z } from "zod";

export const ZLoginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

export const ZRegisterUserSchema = z
  .object({
    firstName: z.string().max(35).nonempty(),
    lastName: z.string().max(35).nonempty(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    passwordConfirm: z.string(),
  })
  .refine((val) => val.password == val.passwordConfirm, {
    message: "Password and confirm password doesn't match",
  });

export interface UserDTO {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
  isVerified?: boolean | null;
}

export type LoginUserDTO = z.infer<typeof ZLoginUserSchema>;
export type RegisterUserDTO = z.infer<typeof ZRegisterUserSchema>;
