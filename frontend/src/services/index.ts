import { accountUpdateSchema } from '@/schemas';
import axios from 'axios';
import { z } from 'zod';

const BASE_URL = 'http://localhost:3000';

export const getCurrentUser = async (token: string | null) => {
  const response = await axios.get(`${BASE_URL}/api/users/currentUser`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const { firstName, lastName, email } = response.data;

  return { firstName, lastName, email, password: '' };
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  if (response.status === 200) {
    return { success: true, token: response.data.token };
  }
  return { success: false };
};

export const updateUser = async (
  { firstName, lastName, email, password }: z.infer<typeof accountUpdateSchema>,
  token: string | null
) => {
  let data = {
    firstName,
    lastName,
    email,
    ...(password !== '' && { password })
  };
  const response = await axios.patch(`${BASE_URL}/api/users`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.status === 200) {
    return { success: true };
  }
  return { success: false };
};
