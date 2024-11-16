import axios from 'axios';
import { useContext, createContext, useMemo, useReducer, useState, useEffect, useLayoutEffect, ReactNode } from 'react';

type AuthContextType = {
  accessToken: string | undefined;
  requestWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
  refreshAccessToken: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const refreshAccessToken = async (): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:3000/refresh', {}, { withCredentials: true });
      if (response.status === 200) {
        const token = response.data.accessToken;
        setAccessToken(token);
      }
    }
  }
}

// const ACTIONS = {
//   setToken: 'setToken',
//   clearToken: 'clearToken'
// };

// const authReducer = (state: any, action: any) => {
//   switch (action.type) {
//     case ACTIONS.setToken:
//       axios.defaults.headers.common['Authorization'] =
//         `Bearer ${action.payload}`;
//       localStorage.setItem('token', action.payload);
//       return { ...state, token: action.payload };
//     case ACTIONS.clearToken:
//       delete axios.defaults.headers.common['Authorization'];
//       localStorage.removeItem('token');
//       return { ...state, token: null };
//     default:
//       console.error('invalid action');
//   }
// };

// const initialData = { token: localStorage.getItem('token') };

// const AuthProvider = ({ children }: any) => {
//   const [state, dispatch] = useReducer(authReducer, initialData);

//   const setToken = (newToken: string | null) => {
//     dispatch({ type: ACTIONS.setToken, payload: newToken });
//   };

//   const clearToken = () => {
//     dispatch({ type: ACTIONS.clearToken });
//   };

//   const contextValue = useMemo(() => {
//     return { ...state, setToken, clearToken };
//   }, [state]);

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default AuthProvider;
