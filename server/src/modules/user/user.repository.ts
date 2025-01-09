import db from "@server/config/db";
import User from "./user.entity";
import users from "@server/database/schema/user.schema";

interface IUserRepository {
  createUser(user: User): Promise<User>;
  // updateUser(id: string, user: Partial<User>): Promise<User>;
  // deleteUser(id: string): Promise<User>;
  // getUserById(id: string): Promise<User | null>;
  // getUserByEmail(email: string): Promise<User | null>;
  // getAllUsers(): Promise<User[]>;
  // userExists(id: string): Promise<boolean>;
}

class UserRepository implements IUserRepository {
  public async createUser(newUser: User): Promise<User> {
    const user = await db.insert(users).values({
      firstName: newUser.getFirstName(),
      lastName: newUser.getLastName(),
      email: newUser.getEmail(),
      passwordHash: newUser.getPasswordHash(),
    });

    return user;
  }
}
