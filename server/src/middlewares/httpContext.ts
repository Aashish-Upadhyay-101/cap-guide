import { Request, Response, NextFunction } from "express";
import { asyncLocalStorage } from "../config/logger";

type HttpContext = {
  method: string;
  url: string;
  ip: string | undefined;
  userAgent: string | undefined;
  status?: number | undefined;
  responseTime?: number;
};

export function httpContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const httpContext: HttpContext = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  };

  asyncLocalStorage.run(httpContext, () => {
    next();
  });
}
