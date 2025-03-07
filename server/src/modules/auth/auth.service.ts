import { TokenPair } from "../../types";
import { AppError } from "../../utils/app-errors";
import TokenService, {
  CustomJwtPayload,
} from "../../utils/services/token.service";
import PasswordService from "../../utils/services/password.service";
import { LoginUserDTO, RegisterUserDTO, UserDTO } from "../user/user.dto";
import UserRepository from "../user/user.repository";

// TODO: updated_at column is showing incorrect values
// add custom trigger in sql migration at last

// TODO: Main frontend React application starts -> core feature implementation

class AuthService {
  private userRepository: UserRepository;
  private tokenService: TokenService;
  private passwordService: PasswordService;

  constructor(
    userRepository: UserRepository,
    tokenService: TokenService,
    passwordService: PasswordService,
  ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.passwordService = passwordService;
  }

  public async registerUser(dto: RegisterUserDTO): Promise<TokenPair> {
    const existingUser = await this.userRepository.getUserByEmail(dto.email);
    if (existingUser) {
      throw new AppError(400, "User with this email already exists");
    }

    const passwordHash = this.passwordService.hashPassword(dto.password);
    const newUser = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash: passwordHash,
    };

    const user = await this.userRepository.createUser(newUser);

    const tokenPair: TokenPair = {
      accessToken: this.tokenService.generateAccessToken({
        userId: user.id as string,
      }),
      refreshToken: this.tokenService.generateRefreshToken({
        userId: user.id as string,
      }),
    };

    return tokenPair;
  }

  public async loginUser(dto: LoginUserDTO): Promise<TokenPair> {
    const user = await this.userRepository.getUserByEmail(dto.email);
    if (!user) {
      throw new AppError(401, "User with this email doesn't exists");
    }

    const passwordHash = user.passwordHash as string;
    const validPassword = this.passwordService.verifyPassword(
      passwordHash,
      dto.password,
    );
    if (!validPassword) {
      throw new AppError(401, "Incorrect password");
    }

    const tokenPair: TokenPair = {
      accessToken: this.tokenService.generateAccessToken({
        userId: user.id,
      }),
      refreshToken: this.tokenService.generateRefreshToken({
        userId: user.id,
      }),
    };

    return tokenPair;
  }

  public tokenRefresh(token: string): TokenPair {
    const decoded = this.tokenService.verifyToken<CustomJwtPayload>(token);
    return {
      accessToken: this.tokenService.generateAccessToken({
        userId: decoded.userId,
      }),
      refreshToken: token,
    };
  }
}

export default AuthService;
