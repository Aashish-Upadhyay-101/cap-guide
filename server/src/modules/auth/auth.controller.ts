import { Request, Response } from "express";
import AuthService from "./auth.service";
import { validateSchema } from "@server/utils/validate-schema";
import { RegisterUserDTO, ZRegisterUserSchema } from "../user/user.dto";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async registerUser(req: Request, res: Response) {
    const data = req.body;
    const registerUserDTO = validateSchema(ZRegisterUserSchema, data);

    const user = await this.authService.registerUser(registerUserDTO);

    res.status(201).json({
      message: "SUCCESS",
      data: user.toJson(),
    });
  }
}

export default AuthController;
