import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

export const accountUpdateSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters ' })
    .optional()
    .or(z.literal(''))
});

export const newPropertyAddressForm = z.object({
  address: z.string().min(1, { message: 'Address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string(),
  zipcode: z.number().min(5, { message: 'Invalid zip code' }).max(5, {message: 'Invalid zip code' })
})
