export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}

export class TokenError extends AppError {
  constructor(message: string) {
    super(400, message);
    this.name = "TokenError";
  }
}
