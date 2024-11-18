import API from '../config/apiClient';

type LoginParams = {
  email: string;
  password: string;
};

export const login = async (data: LoginParams) => {
  return await API.post('/auth/login', data);
};
