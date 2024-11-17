import { z } from 'zod';

export const emailSchema = z.string().email().min(1).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6).max(255),
  userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(6).max(255),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const verificationCodeSchema = z.string().min(1).max(24);
