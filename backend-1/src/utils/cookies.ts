import { CookieOptions, Response } from 'express';
import { NODE_ENV } from '../constants/env';
import { fifteenMinutesFromNow, thirthyDaysFromNow } from './date';

const REFRESH_PATH = '/auth/refresh';

const defaults: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure: NODE_ENV !== 'development',
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirthyDaysFromNow(),
  path: REFRESH_PATH,
});

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
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
};

export const clearAuthCookies = (res: Response) => {
  return res
    .clearCookie('accessToken')
    .clearCookie('refreshToken', { path: REFRESH_PATH });
};
