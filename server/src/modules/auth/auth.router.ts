import BaseRouter from "../core/base.router";
import UserRepository from "../user/user.repository";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

class AuthRouter extends BaseRouter {
  private authController: AuthController;
  private authService: AuthService;
  private userRepository: UserRepository;

  constructor() {
    super();

    this.userRepository = new UserRepository();
    this.authService = new AuthService(this.userRepository);
    this.authController = new AuthController(this.authService);

    this.setRoutes((router) => {
      router.post("/register", this.authController.registerUser);
    });
  }
}

export default AuthRouter;
