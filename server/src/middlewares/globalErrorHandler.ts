import { NextFunction, Request, Response } from "express";
import { PostgresError } from "postgres";
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
  let statusCode = 500;
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

    statusCode = 400;
    errorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        messages: details.map((detail) => detail.message),
      },
    };
  } else if (err instanceof AppError) {
    logger.error(err.name, {
      messages: [err.message],
    });

    statusCode = err.statusCode;
    errorResponse = {
      success: false,
      error: {
        messages: [err.message],
        code: err.name.toUpperCase(),
      },
    };
  } else if (err instanceof PostgresError) {
    const errMessageToArray = err.constraint_name?.split("_") as string[];
    const message = `${errMessageToArray[0]} ${errMessageToArray[1]} should be ${errMessageToArray[2]}`;

    statusCode = 500;
    errorResponse = {
      success: false,
      error: {
        messages: [message],
        code: "DATABASE_ERROR",
      },
    };
  }
  res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
