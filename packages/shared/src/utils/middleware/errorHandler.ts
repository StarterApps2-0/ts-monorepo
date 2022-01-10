import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../errors";
import { NextFunction, Request, Response } from "express";
import PrettyError from "pretty-error";
import { logger } from "../logger";

const pe = new PrettyError();
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  logger.error(`${req.method} - ${req.path}`);
  logger.error(
    process.env.NODE_ENV === "production" ? error : pe.render(error)
  );

  const { name, message, details } = error;
  const response = {
    error: {
      name,
      message,
      details,
    },
  };

  if (error instanceof NotFoundError) {
    return res.status(404).send(response);
  }

  if (error instanceof BadRequestError) {
    return res.status(400).send(response);
  }

  if (error instanceof UnauthorizedError) {
    return res.status(403).send(response);
  }

  if (error instanceof UnprocessableEntityError) {
    res.status(422).send(response);
  }

  return res.status(500).send(response);
};
