import { Request, Response } from "express";
import AuthService from "./auth.service";
import { ZLoginUserSchema, ZRegisterUserSchema } from "../user/user.dto";
import { catchAsyncError } from "../../utils/catch-async-error";
import { clearCookies, setCookies } from "../../utils/cookie";
import logger from "../../config/logger";
import { AppError } from "../../utils/app-errors";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public registerUser = catchAsyncError(async (req: Request, res: Response) => {
    const data = req.body;
    const registerUserDTO = ZRegisterUserSchema.parse(data);

    const tokenPair = await this.authService.registerUser(registerUserDTO);

    setCookies(res, "accessToken", tokenPair.accessToken);
    setCookies(res, "refreshToken", tokenPair.refreshToken);

    logger.info("User registered successfully", { data: registerUserDTO });

    res.status(201).json({
      message: "SUCCESS",
      data: tokenPair,
    });
  });

  public loginUser = catchAsyncError(async (req: Request, res: Response) => {
    const data = req.body;
    const loginUserDTO = ZLoginUserSchema.parse(data);

    const tokenPair = await this.authService.loginUser(loginUserDTO);

    setCookies(res, "accessToken", tokenPair.accessToken);
    setCookies(res, "refreshToken", tokenPair.refreshToken);

    logger.info("User logged in successfully", { data: loginUserDTO.email });

    res.status(200).json({
      message: "SUCCESS",
      data: tokenPair,
    });
  });

  public logoutUser = catchAsyncError(async (req: Request, res: Response) => {
    clearCookies(res, "accessToken");
    clearCookies(res, "refreshToken");

    logger.info("User logged out", { data: req?.user });

    res.status(200).json({
      message: "SUCCESS",
    });
  });

  public getMe = catchAsyncError(async (req: Request, res: Response) => {
    res.status(200).json({
      message: "SUCCESS",
      data: req?.user,
    });
  });

  public tokenRefresh = catchAsyncError(async (req: Request, res: Response) => {
    let token;
    if (req.body.refreshToken) {
      token = req.body.refreshToken;
    } else if (req.query.refreshToken) {
      token = req.query.refreshToken;
    } else if (req.cookies && req.cookies.refreshToken) {
      token = req.cookies.refreshToken;
    }

    if (!token) {
      throw new AppError(401, "User must be logged in to perform this action");
    }

    const tokenPair = this.authService.tokenRefresh(token);

    setCookies(res, "accessToken", tokenPair.accessToken);
    setCookies(res, "refreshToken", tokenPair.refreshToken);

    logger.info("Token refreshed successfully");

    res.status(201).json({
      message: "SUCCESS",
      data: tokenPair,
    });
  });

  // TODO: featuers that will be added at last
  public resetPassword = catchAsyncError(
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
