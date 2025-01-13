import JWT from "../../utils/jwt";
import BaseRouter from "../core/base.router";
import UserRepository from "../user/user.repository";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

class AuthRouter extends BaseRouter {
  private authController: AuthController;
  private authService: AuthService;
  private userRepository: UserRepository;
  private jwt: JWT;

  constructor() {
    super();

    this.userRepository = new UserRepository();
    this.jwt = new JWT(process.env.JWT_SECRET_KEY!, process.env.APP!);
    this.authService = new AuthService(this.userRepository, this.jwt);
    this.authController = new AuthController(this.authService);

    this.setRoutes((router) => {
      router.post("/register", this.authController.registerUser);
      router.post("/login", this.authController.loginUser);
      router.post("/logout", this.authController.loginUser);
      router.get("/me", this.authController.getMe);
      router.post("/token-refresh", this.authController.tokenRefresh);
      router.post("/reset-password", this.authController.resetPassword);
      router.get("/verify-user", this.authController.verifyUser);
      router.get("/social", this.authController.socialLogin);
    });
  }
}

export default AuthRouter;
