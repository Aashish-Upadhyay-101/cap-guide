import { Request, Response, NextFunction } from "express";
import { asyncLocalStorage } from "../config/logger";

export function httpContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const httpContext = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  };

  asyncLocalStorage.run(httpContext, () => {
    next();
  });
}
