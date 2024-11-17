import { Request, RequestHandler } from 'express';
import appAssert from '../utils/appAssert';
import { UNAUTHORIZED } from '../constants/http';
import AppErrorCode from '../constants/appErrorCode';
import { verifyToken } from '../utils/jwt';
import mongoose, { mongo, ObjectId } from 'mongoose';

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    'unauthorized',
    AppErrorCode.InvalidAccessToken,
  );

  console.log('found access token cookie');

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === 'jwt expired' ? 'token expired' : 'invalid token',
    AppErrorCode.InvalidAccessToken,
  );

  console.log('verified access token');

  req.user = { id: payload.userId as mongoose.Types.ObjectId };
  req.session = { id: payload.sessionId as mongoose.Types.ObjectId };

  console.log('set user and session on request');

  next();
};

export default authenticate;
