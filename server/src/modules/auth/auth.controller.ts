import AuthService from "./auth.service";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async registerUser() {}
}
