import API from '../config/apiClient';

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type VerifyEmailParams = string | undefined;

type ForgotPasswordParams = {
  email: string;
};

type ResetPasswordParams = {
  password: string;
  confirmPassword: string;
  verificationCode: string;
};

export const login = async (data: LoginParams) => {
  return await API.post('/auth/login', data);
};

export const logout = async () => {
  return await API.get('/auth/logout');
};

export const createAccount = async (data: RegisterParams) => {
  return await API.post('/auth/register', data);
};

export const verifyEmail = async (code: VerifyEmailParams) => {
  return await API.get(`/auth/email/verify/${code}`);
};

export const sendPasswordResetEmail = async (data: ForgotPasswordParams) => {
  return await API.post('/auth/password/forgot', data);
};

export const resetPassword = async (data: ResetPasswordParams) => {
  return await API.post('/auth/password/reset', data);
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  __v: number;
};

export const getCurrentUser = async (): Promise<User> => {
  return await API.get('/users/currentUser');
};
