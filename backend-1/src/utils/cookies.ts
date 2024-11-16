import { CookieOptions, Response } from 'express';
import { NODE_ENV } from '../constants/env';
import { fifteenMinutesFromNow, thirthyDaysFromNow } from './date';

const defaults: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure: NODE_ENV !== 'development',
};

type AuthCookieParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: AuthCookieParams) => {
  return res
    .cookie('accessToken', accessToken, {
      ...defaults,
      expires: fifteenMinutesFromNow(),
    })
    .cookie('refreshToken', refreshToken, {
      ...defaults,
      expires: thirthyDaysFromNow(),
      path: '/auth/refresh',
    });
};
