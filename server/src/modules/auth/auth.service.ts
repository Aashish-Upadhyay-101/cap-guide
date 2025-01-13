import { TokenPair } from "../../types";
import { AppError } from "../../utils/app-errors";
import JWT from "../../utils/jwt";
import { RegisterUserDTO, UserDTO } from "../user/user.dto";
import User from "../user/user.entity";
import UserRepository from "../user/user.repository";

// TODO: updated_at column is showing incorrect values

// TODO: register user incomplete -> jwt token setup

class AuthService {
  private userRepository: UserRepository;
  private jwt: JWT;

  constructor(userRepository: UserRepository, jwt: JWT) {
    this.userRepository = userRepository;
    this.jwt = jwt;
  }

  public async registerUser(
    dto: RegisterUserDTO,
  ): Promise<UserDTO & TokenPair> {
    const existingUser = await this.userRepository.getUserByEmail(dto.email);
    if (existingUser) {
      throw new AppError(400, "User with this email already exists");
    }

    const newUser = new User(dto.firstName, dto.lastName, dto.email);
    newUser.setPassword(dto.password);

    const user = await this.userRepository.createUser(newUser);

    const tokenPair: TokenPair = {
      accessToken: this.jwt.generateToken(
        { userId: user.getId() },
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        },
      ),
      refreshToken: this.jwt.generateToken(
        {
          userId: user.getId(),
        },
        {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
        },
      ),
    };

    return {
      ...user.toDTO(),
      ...tokenPair,
    };
  }
}

export default AuthService;
