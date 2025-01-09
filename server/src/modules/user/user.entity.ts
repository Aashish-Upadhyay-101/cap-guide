import { pbkdf2Sync, randomBytes } from "crypto";

class User {
  constructor(
    private firstName: string,
    private lastName: string,
    private email: string,
    private passwordHash: string,
    private id?: string,
    private avatarUrl?: string,
    private isVerified?: boolean,
    private passwordSalt?: string,
  ) {}

  public getId(): string | undefined {
    return this.id;
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
    this.passwordSalt = randomBytes(16).toString("hex");
    this.passwordHash = pbkdf2Sync(
      password,
      this.passwordSalt,
      1000,
      64,
      "sha512",
    ).toString("hex");
  }

  public verifyPassword(password: string): boolean {
    const passwordSalt = this.passwordSalt as string;
    const passwordHash = pbkdf2Sync(
      password,
      passwordSalt,
      1000,
      64,
      "sha512",
    ).toString("hex");

    return this.passwordHash === passwordHash;
  }
}

export default User;
