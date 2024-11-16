import { createAccount } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { z } from 'zod';
import { setAuthCookies } from '../utils/cookies';
import { CREATED } from '../constants/http';

const registerSchema = z
  .object({
    email: z.string().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

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
