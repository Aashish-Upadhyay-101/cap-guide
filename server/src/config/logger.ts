import winston from "winston";
import { AsyncLocalStorage } from "node:async_hooks";

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

export const asyncLocalStorage = new AsyncLocalStorage();

const addHttpContext = winston.format((info) => {
  const httpContext = asyncLocalStorage.getStore();
  if (httpContext) {
    return {
      ...info,
      ...httpContext,
    };
  }
  return info;
});

const {
  combine,
  timestamp,
  json,
  prettyPrint,
  errors,
  splat,
  simple,
  colorize,
} = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  levels: logLevels,
  format: combine(
    timestamp(),
    addHttpContext(),
    json(),
    prettyPrint(),
    splat(),
    errors({ stack: true }),
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), simple()),
    }),
    new winston.transports.File({
      filename: "./logs/combined.log",
      maxsize: 5 * 1024 * 1024, // 5 MB
      maxFiles: 3,
    }),
  ],
});

export default logger;
