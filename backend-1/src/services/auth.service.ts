import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import { oneYearFromNow } from '../utils/date';
import jwt from 'jsonwebtoken';

export type CreateAccountParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const existingUser = await UserModel.exists({ email: data.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await UserModel.create({
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
  });

  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    { expiresIn: '30d', audience: ['user'] },
  );

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    { expiresIn: '15m', audience: ['user'] },
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};
