import TokenService from "../../utils/services/token.service";
import PasswordService from "../../utils/services/password.service";
import BaseRouter from "../core/base.router";
import UserRepository from "../user/user.repository";
import AuthController from "./auth.controller";
import AuthMiddleware from "./auth.middleware";
import AuthService from "./auth.service";

class AuthRouter extends BaseRouter {
  private authController: AuthController;
  private authService: AuthService;
  private userRepository: UserRepository;
  private tokenService: TokenService;
  private passwordService: PasswordService;
  private authMiddleware: AuthMiddleware;

  constructor() {
    super();

    this.userRepository = new UserRepository();

    this.tokenService = new TokenService(
      process.env.JWT_SECRET_KEY!,
      process.env.APP!,
    );
    this.passwordService = new PasswordService();
    this.authService = new AuthService(
      this.userRepository,
      this.tokenService,
      this.passwordService,
    );
    this.authController = new AuthController(this.authService);
    this.authMiddleware = new AuthMiddleware(
      this.tokenService,
      this.userRepository,
    );

    this.setRoutes((router) => {
      router.post("/register", this.authController.registerUser);
      router.post("/login", this.authController.loginUser);
      router.get("/social", this.authController.socialLogin);
      router.post(
        "/logout",
        this.authMiddleware.protectRoute,
        this.authController.logoutUser,
      );
      router.get(
        "/me",
        this.authMiddleware.protectRoute,
        this.authController.getMe,
      );
      router.post("/token-refresh", this.authController.tokenRefresh);
      router.post("/reset-password", this.authController.resetPassword);
      router.get("/verify-user", this.authController.verifyUser);
    });
  }
}

export default AuthRouter;
