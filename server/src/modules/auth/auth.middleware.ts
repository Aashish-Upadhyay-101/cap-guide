import { NextFunction, Request } from "express";
import { catchAsyncError } from "../../utils/catch-async-error";
import { AppError } from "../../utils/app-errors";
import JWT, { CustomJwtPayload } from "../../utils/jwt";
import UserRepository from "../user/user.repository";

class AuthMiddleware {
  private jwt: JWT;
  private userRepository: UserRepository;

  constructor(jwt: JWT, userRepository: UserRepository) {
    this.jwt = jwt;
    this.userRepository = userRepository;
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

      req.user = currentUser.toDTO();
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
    return this.jwt.verifyToken<CustomJwtPayload>(token);
  }
}

export default AuthMiddleware;
