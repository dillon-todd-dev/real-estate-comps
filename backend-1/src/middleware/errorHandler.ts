import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constants/http';
import AppError from '../utils/AppError';

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => {
    return { path: err.path.join('.'), message: err.message };
  });

  res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(`PATH: '${req.path}'`, error);

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  } else if (error instanceof AppError) {
    handleAppError(res, error);
  }
  res.status(INTERNAL_SERVER_ERROR).send('Internal Server Error');
};

export default errorHandler;
