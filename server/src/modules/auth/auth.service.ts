import { AppError } from "../../utils/app-errors";
import { RegisterUserDTO } from "../user/user.dto";
import User from "../user/user.entity";
import UserRepository from "../user/user.repository";

// TODO: updated_at column is showing incorrect values

// TODO: register user incomplete -> jwt token setup

class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async registerUser(dto: RegisterUserDTO): Promise<User> {
    const existingUser = await this.userRepository.getUserByEmail(
      dto.email,
    );
    if (existingUser) {
      throw new AppError(400, "User with this email already exists");
    }

    const newUser = new User(dto.firstName, dto.lastName, dto.email);
    newUser.setPassword(dto.password);

    const user = await this.userRepository.createUser(newUser);
    return user;
  }
}

export default AuthService;
