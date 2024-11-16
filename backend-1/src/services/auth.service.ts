import { verify } from 'jsonwebtoken';
import { CONFLICT, UNAUTHORIZED } from '../constants/http';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import appAssert from '../utils/appAssert';
import { oneYearFromNow, thirthyDaysFromNow } from '../utils/date';
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from '../utils/jwt';

export type CreateAccountParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userAgent?: string;
};

export type LoginUserParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async ({
  email,
  password,
  firstName,
  lastName,
  userAgent,
}: CreateAccountParams) => {
  const existingUser = await UserModel.exists({ email });
  appAssert(!existingUser, CONFLICT, 'user already exists with email');

  const user = await UserModel.create({
    email,
    password,
    firstName,
    lastName,
  });

  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  const session = await SessionModel.create({
    userId: user._id,
    userAgent,
  });

  const accessToken = signToken({ userId: user._id, sessionId: session._id });

  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions,
  );

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginUserParams) => {
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, 'invalid email or password');

  const validPassword = await user.comparePassword(password);
  appAssert(validPassword, UNAUTHORIZED, 'invalid email or password');

  const session = await SessionModel.create({
    userId: user._id,
    userAgent,
  });

  const accessToken = signToken({ userId: user._id, sessionId: session._id });

  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions,
  );

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, 'invalid refresh token');

  const session = await SessionModel.findById(payload.sessionId);
  appAssert(
    session && session.expiresAt.getTime() > Date.now(),
    UNAUTHORIZED,
    'session expired',
  );

  const sessionNeedsRefresh =
    session.expiresAt.getTime() - Date.now() <= 24 * 60 * 60 * 1000;
  if (sessionNeedsRefresh) {
    session.expiresAt = thirthyDaysFromNow();
    await session.save();
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session._id }, refreshTokenSignOptions)
    : undefined;
  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return { accessToken, newRefreshToken };
};
