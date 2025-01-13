import { pbkdf2Sync, randomBytes } from "crypto";

class PasswordService {
  public hashPassword(password: string): string {
    const passwordSalt = randomBytes(16).toString("hex");
    const passwordHash = pbkdf2Sync(
      password,
      passwordSalt,
      1000,
      64,
      "sha512",
    ).toString("hex");
    return `${passwordSalt}-${passwordHash}`;
  }

  public verifyPassword(oldPasswordHashWithSalt: string, newPassword: string) {
    const oldPasswordHashWithSaltArray = oldPasswordHashWithSalt.split("-");
    const oldPasswordSalt = oldPasswordHashWithSaltArray[0];
    const oldPasswordHash = oldPasswordHashWithSaltArray[1];

    const newPasswordHash = pbkdf2Sync(
      newPassword,
      oldPasswordSalt,
      1000,
      64,
      "sha512",
    ).toString("hex");

    return oldPasswordHash === newPasswordHash;
  }
}

export default PasswordService;
