import { Request, Response } from "express";
import AuthService from "./auth.service";
import { ZRegisterUserSchema } from "../user/user.dto";
import { validateSchema } from "../../utils/validate-schema";
import logger from "../../config/logger";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public registerUser = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const registerUserDTO = validateSchema(ZRegisterUserSchema, data);

      const user = await this.authService.registerUser(registerUserDTO);

      res.status(201).json({
        message: "SUCCESS",
        data: user.toDTO(),
      });
    } catch (error) {
      logger.error("Error: ", (error as Error).message);
      return res.json({
        message: "FAILED",
        error: error,
      });
    }
  };
}

export default AuthController;
