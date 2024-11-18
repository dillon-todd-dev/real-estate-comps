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

export const login = async (data: LoginParams) => {
  return await API.post('/auth/login', data);
};

export const createAccount = async (data: RegisterParams) => {
  return await API.post('/auth/register', data);
};

export const verifyEmail = async (code: VerifyEmailParams) => {
  return await API.get(`/auth/email/verify/${code}`);
};

export const forgotPassword = async (data: ForgotPasswordParams) => {
  return await API.post('/auth/password/forgot', data);
};
