import { eq } from "drizzle-orm";
import User from "./user.entity";
import db from "../../config/db";
import users from "../../database/schema/user.schema";

//
interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  // updateUser(id: string, user: Partial<User>): Promise<User>;
  // deleteUser(id: string): Promise<User>;
  // getAllUsers(): Promise<User[]>;
  // userExists(id: string): Promise<boolean>;
}

class UserRepository implements IUserRepository {
  public async createUser(newUser: User): Promise<User> {
    const user = await db
      .insert(users)
      .values({
        firstName: newUser.getFirstName(),
        lastName: newUser.getLastName(),
        email: newUser.getEmail(),
        passwordHash: newUser.getPasswordHash(),
      })
      .returning()
      .then((row) => row[0]);

    return new User(user.firstName, user.lastName, user.email, user.id);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((row) => row[0]);

    if (!existingUser) return null;

    const { id, firstName, lastName, email: mail, passwordHash } = existingUser;

    return new User(firstName, lastName, mail, id, passwordHash as string);
  }

  public async getUserById(id: string): Promise<User | null> {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .then((row) => row[0]);

    if (!existingUser) return null;

    const {
      id: userId,
      firstName,
      lastName,
      email: mail,
      avatarUrl,
      isVerified,
    } = existingUser;

    return new User(
      firstName,
      lastName,
      mail,
      userId,
      undefined,
      avatarUrl as string,
      isVerified as boolean,
    );
  }
}

export default UserRepository;
