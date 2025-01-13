import { Request, Response } from "express";
import AuthService from "./auth.service";
import { ZLoginUserSchema, ZRegisterUserSchema } from "../user/user.dto";
import { catchAsyncError } from "../../utils/catch-async-error";
import { clearCookies, setCookies } from "../../utils/cookie";
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

  public logoutUser = catchAsyncError(async (req: Request, res: Response) => {
    clearCookies(res, "accessToken");
    clearCookies(res, "refreshToken");

    // TODO: logger.info("User logged out", { data: req.user });

    res.status(200).json({
      message: "SUCCESS",
    });
  });

  public getMe = catchAsyncError(async (req: Request, res: Response) => {});

  public resetPassword = catchAsyncError(
    async (req: Request, res: Response) => {},
  );

  public tokenRefresh = catchAsyncError(
    async (req: Request, res: Response) => {},
  );

  public verifyUser = catchAsyncError(
    async (req: Request, res: Response) => {},
  );

  public socialLogin = catchAsyncError(
    async (req: Request, res: Response) => {},
  );
}

export default AuthController;
