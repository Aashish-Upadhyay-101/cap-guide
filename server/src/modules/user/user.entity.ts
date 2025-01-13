import { pbkdf2Sync, randomBytes } from "crypto";
import { UserDTO } from "./user.dto";

class User {
  constructor(
    private firstName: string,
    private lastName: string,
    private email: string,
    private id?: string,
    private passwordHash?: string,
    private avatarUrl?: string,
    private isVerified?: boolean,
  ) {}

  public getId(): string | undefined {
    return this.id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getEmail(): string {
    return this.email;
  }

  public getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }

  public isUserVerified(): boolean | undefined {
    return this.isVerified;
  }

  public setPassword(password: string): void {
    const passwordSalt = randomBytes(16).toString("hex");
    const passwordHash = pbkdf2Sync(
      password,
      passwordSalt,
      1000,
      64,
      "sha512",
    ).toString("hex");
    this.passwordHash = `${passwordSalt}-${passwordHash}`;
  }

  public getPasswordHash(): string | undefined {
    return this.passwordHash;
  }

  public verifyPassword(password: string): boolean {
    const passwordWithSalt = this.passwordHash?.split("-") as string[];
    const passwordSalt = passwordWithSalt[0] as string;
    const originalPassword = passwordWithSalt[1] as string;

    const passwordHash = pbkdf2Sync(
      password,
      passwordSalt,
      1000,
      64,
      "sha512",
    ).toString("hex");

    return originalPassword === passwordHash;
  }

  public toDTO() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      avatarUrl: this.avatarUrl,
      isVerified: this.isVerified,
    };
  }
}

export default User;
