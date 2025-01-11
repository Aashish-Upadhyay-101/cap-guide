import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

class JWT {
  private readonly secretKey: string;
  private readonly expiresIn: string;
  private readonly issuer: string;

  constructor(secretKey: string, expiresIn: string, issuer: string) {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
    this.issuer = issuer;
  }

  public generateToken(
    payload: Record<string, unknown>,
    options?: SignOptions,
  ): string {
    const token = jwt.sign(payload, this.secretKey, {
      issuer: this.issuer,
      expiresIn: this.expiresIn,
      ...options,
    });
    return token;
  }

  public verifyToken<T extends JwtPayload>(token: string): T {}
}

export default JWT;
