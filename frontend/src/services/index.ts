import axios from 'axios';

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
}
