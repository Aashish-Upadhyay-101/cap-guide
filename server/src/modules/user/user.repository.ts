import { eq } from "drizzle-orm";
import db from "../../config/db";
import users, { User } from "../../database/schema/user.schema";

interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
}

class UserRepository implements IUserRepository {
  public async createUser(newUser: User): Promise<User> {
    const user = await db
      .insert(users)
      .values({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        passwordHash: newUser.passwordHash,
      })
      .returning()
      .then((row) => row[0]);

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((row) => row[0]);

    return user;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .then((row) => row[0]);

    return user;
  }
}

export default UserRepository;
