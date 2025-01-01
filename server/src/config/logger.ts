import winston from "winston";

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const { timestamp, json, cli } = winston.format;

const logger = winston.createLogger({
  level: "info",
  levels: logLevels,
  format: timestamp(),
  transports: [
    new winston.transports.Console({
      format: cli({ all: true }),
    }),
    new winston.transports.File({
      filename: "app.log",
      format: json(),
    }),
  ],
});

export default logger;
