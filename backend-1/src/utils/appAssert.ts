import assert from 'node:assert';
import AppError from './AppError';
import { HttpStatusCode } from '../constants/http';
import AppErrorCode from '../constants/appErrorCode';

/**
 * Asserts a condition and throws an AppError if the condition is falsy
 */

const appAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode: AppErrorCode,
) => {
  assert(condition, new AppError(httpStatusCode, message, appErrorCode));
};
