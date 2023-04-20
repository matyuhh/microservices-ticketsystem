import { NextFunction, Request, Response } from 'express';

import CustomError from '../errors/custom-error';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};

export default errorHandler;
