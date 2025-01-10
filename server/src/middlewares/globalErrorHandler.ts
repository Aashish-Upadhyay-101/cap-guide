import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { ZodError } from "zod";
import { AppError } from "../utils/app-errors";

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    messages: string[];
  };
}

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      messages: [err.message],
    },
  };

  if (err instanceof ZodError) {
    const details = err.errors.map((error) => ({
      path: error.path,
      message: error.message,
    }));

    logger.error(err.name, {
      messages: details.map((detail) => detail.message),
    });

    errorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        messages: details.map((detail) => detail.message),
      },
    };
    res.status(400).json(errorResponse);
  }

  if (err instanceof AppError) {
    errorResponse = {
      success: false,
      error: {
        messages: [err.message],
        code: err.name.toUpperCase(),
      },
    };
    res.status(err.statusCode).json(errorResponse);
  }
};

export default globalErrorHandler;
