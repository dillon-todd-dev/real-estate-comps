import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }).max(255),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
