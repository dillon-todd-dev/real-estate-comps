import { z } from 'zod';

const emailSchema = z
  .string()
  .email()
  .min(1, { message: 'Email is required' })
  .max(255);

const passwordSchema = z
  .string()
  .min(1, { message: 'Password must be at least 6 characters' })
  .max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }).max(50),
    lastName: z.string().min(1, { message: 'Last name is required' }).max(50),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
