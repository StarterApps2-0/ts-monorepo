import winston from "winston";

export const logger = winston.createLogger({
  level: process.env.WINSTON_LOGGER_LEVEL || "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});
