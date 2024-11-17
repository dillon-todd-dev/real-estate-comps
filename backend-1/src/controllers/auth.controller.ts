import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  sendPasswordResetEmail,
  verifyEmail,
} from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from '../utils/cookies';
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from '../constants/http';
import {
  emailSchema,
  loginSchema,
  registerSchema,
  verificationCodeSchema,
} from './auth.schemas';
import { verifyToken } from '../utils/jwt';
import SessionModel from '../models/session.model';
import appAssert from '../utils/appAssert';
import UserModel from '../models/user.model';

export const registerHandler = asyncHandler(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });
  const { user, accessToken, refreshToken } = await createAccount(request);
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = asyncHandler(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });
  const { accessToken, refreshToken } = await loginUser(request);
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: 'login successful' });
});

export const logoutHandler = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = verifyToken(accessToken || '');

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearAuthCookies(res)
    .status(OK)
    .json({ message: 'logout successful' });
});

export const refreshHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, 'missing refresh token');

  const { accessToken, newRefreshToken } =
    await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOptions());
  }
  res.cookie('accessToken', accessToken, getAccessTokenCookieOptions());

  return res.status(OK).json({ message: 'access token refreshed ' });
});

export const verifyEmailHandler = asyncHandler(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);
  const { user } = await verifyEmail(verificationCode);
  return res
    .status(OK)
    .json({ user, message: 'email was successfully verified' });
});

export const forgotPasswordHandler = asyncHandler(async (req, res) => {
  console.log('made it here');
  const email = emailSchema.parse(req.body.email);
  const userExists = UserModel.exists({ email });
  appAssert(userExists, NOT_FOUND, 'user does not exist');

  await sendPasswordResetEmail(email);

  return res.status(OK).json({ message: 'password reset email sent' });
});
