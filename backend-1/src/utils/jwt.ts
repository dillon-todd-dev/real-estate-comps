import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { SessionDocument } from '../models/session.model';
import { UserDocument } from '../models/user.model';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';

export type RefreshTokenPayload = {
  sessionId: SessionDocument['_id'];
};

export type AccessTokenPayload = {
  userId: UserDocument['_id'];
  sessionId: SessionDocument['_id'];
};

type JwtSignOptions = SignOptions & { secret: string };
type JwtVerifyOptions = VerifyOptions & { secret: string };

const defaults: SignOptions = {
  audience: ['user'],
};

const accessTokenSignOptions: JwtSignOptions = {
  expiresIn: '15m',
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: JwtSignOptions = {
  expiresIn: '30d',
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: JwtSignOptions,
) => {
  const { secret, ...signOptions } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, { ...defaults, ...signOptions });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: JwtVerifyOptions,
) => {
  const { secret = JWT_SECRET, ...verifyOptions } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOptions,
    }) as TPayload;
    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
