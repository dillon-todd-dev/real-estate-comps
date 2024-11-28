import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api';

export const AUTH = 'auth';

const useAuth = (opts = {}) => {
  const { data: currentUser, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    ...opts,
  });

  return {
    currentUser,
    ...rest,
  };
};

export default useAuth;
