import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { TokenError } from "../app-errors";
import { Request } from "express";

export interface CustomJwtPayload {
  userId: string;
}

class TokenService {
  private readonly secretKey: string;
  private readonly issuer: string;

  constructor(secretKey: string, issuer: string) {
    this.secretKey = secretKey;
    this.issuer = issuer;
  }

  public generateAccessToken(payload: CustomJwtPayload) {
    return this.generateToken(payload, {
      expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES),
    });
  }

  public generateRefreshToken(payload: CustomJwtPayload) {
    return this.generateToken(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    });
  }

  public verifyToken<T extends JwtPayload>(token: string): T {
    try {
      const decoded = jwt.verify(token, this.secretKey, {
        issuer: this.issuer,
      });

      console.log({ decoded });

      return decoded as T;
    } catch (error) {
      throw new TokenError(error.message);
    }
  }

  public decodeToken(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }

  private generateToken(
    payload: CustomJwtPayload,
    options?: SignOptions,
  ): string {
    const token = jwt.sign(payload, this.secretKey, {
      issuer: this.issuer,
      ...options,
    });
    return token;
  }
}

export default TokenService;
