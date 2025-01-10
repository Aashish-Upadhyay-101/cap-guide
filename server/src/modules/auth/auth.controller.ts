import { Request, Response } from "express";
import AuthService from "./auth.service";
import { ZRegisterUserSchema } from "../user/user.dto";
import { catchAsyncError } from "../../utils/catch-async-error";

// TODO: remove password salt from the password and attached the password salt value in the password itself

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public registerUser = catchAsyncError(
    async (req: Request, res: Response) => {
      const data = req.body;
      const registerUserDTO = ZRegisterUserSchema.parse(data);

      const user = await this.authService.registerUser(registerUserDTO);

      res.status(201).json({
        message: "SUCCESS",
        data: user.toDTO(),
      });
    },
  );
}

export default AuthController;
