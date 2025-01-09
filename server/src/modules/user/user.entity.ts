class User {
  constructor(
    private firstName: string,
    private lastName: string,
    private email: string,
    private passwordHash: string,
    private id?: string,
    private avatarUrl?: string,
    private isVerified?: boolean,
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
}

export default User;
