import { eq } from "drizzle-orm";
import db from "../../config/db";
import users, {
  UserInsert,
  UserSelect,
} from "../../database/schema/user.schema";

interface IUserRepository {
  createUser(user: UserInsert): Promise<UserInsert>;
  getUserByEmail(email: string): Promise<UserSelect | null>;
  getUserById(id: string): Promise<UserSelect | null>;
}

class UserRepository implements IUserRepository {
  public async createUser(newUser: UserInsert): Promise<UserInsert> {
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

  public async getUserByEmail(email: string): Promise<UserSelect> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((row) => row[0]);

    return user;
  }

  public async getUserById(id: string): Promise<UserSelect> {
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
