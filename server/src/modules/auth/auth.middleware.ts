import { NextFunction, Request } from "express";
import { catchAsyncError } from "../../utils/catch-async-error";
import { AppError } from "../../utils/app-errors";
import TokenService, {
  CustomJwtPayload,
} from "../../utils/services/token.service";
import UserRepository from "../user/user.repository";
import { UserDTO } from "../user/user.dto";

class AuthMiddleware {
  private tokenService: TokenService;
  private userRepository: UserRepository;

  constructor() {
    this.tokenService = new TokenService(
      process.env.JWT_SECRET_KEY!,
      process.env.APP!,
    );
    this.userRepository = new UserRepository();
  }

  public protectRoute = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = this.getAuthorizationHeader(req);
      if (!token) {
        throw new AppError(401, "You are not logged in");
      }

      const decoded = this.verifyToken(token);
      const currentUser = await this.getCurrentUser(decoded.userId);
      if (!currentUser) {
        throw new AppError(401, "This user doesn't exists");
      }

      const authenticatedUser: UserDTO = {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        avatarUrl: currentUser.avatarUrl!,
        isVerified: currentUser.isVerified!,
      };

      req.user = authenticatedUser;

      next();
    },
  );

  private async getCurrentUser(userId: string) {
    return await this.userRepository.getUserById(userId);
  }

  private getAuthorizationHeader(req: Request): string {
    let token;
    let authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
      token = authorizationHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    return token;
  }

  private verifyToken(token: string) {
    return this.tokenService.verifyToken<CustomJwtPayload>(token);
  }
}

export default AuthMiddleware;
