import { asyncHandler } from '../utils/asyncHandler';
import UserModel from '../models/user.model';
import { NOT_FOUND, OK } from '../constants/http';
import appAssert from '../utils/appAssert';

export const currentUserHandler = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  appAssert(user, NOT_FOUND, 'user not found');
  res.status(OK).json(user.omitPassword());
});
