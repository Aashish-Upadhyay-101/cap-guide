import { Request, Response } from "express";
import AuthService from "./auth.service";
import { ZLoginUserSchema, ZRegisterUserSchema } from "../user/user.dto";
import { catchAsyncError } from "../../utils/catch-async-error";
import { setCookies } from "../../utils/cookie";
import logger from "../../config/logger";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public registerUser = catchAsyncError(async (req: Request, res: Response) => {
    const data = req.body;
    const registerUserDTO = ZRegisterUserSchema.parse(data);

    const userWithToken = await this.authService.registerUser(registerUserDTO);

    setCookies(res, "accessToken", userWithToken.accessToken);
    setCookies(res, "refreshToken", userWithToken.refreshToken);

    logger.info("User registered successfully", { data: userWithToken });

    res.status(201).json({
      message: "SUCCESS",
      data: userWithToken,
    });
  });

  public loginUser = catchAsyncError(async (req: Request, res: Response) => {
    const data = req.body;
    const loginUserDTO = ZLoginUserSchema.parse(data);

    const userWithToken = await this.authService.loginUser(loginUserDTO);

    setCookies(res, "accessToken", userWithToken.accessToken);
    setCookies(res, "refreshToken", userWithToken.refreshToken);

    logger.info("User logged in successfully", { data: userWithToken });

    res.status(200).json({
      message: "SUCCESS",
      data: userWithToken,
    });
  });
}

export default AuthController;
