import useAuth from '@/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

const LayoutContainer = () => {
  const { currentUser, isLoading } = useAuth();

  return isLoading ? (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-current' />
    </div>
  ) : currentUser ? (
    <div className='min-h-screen'>
      <Outlet />
    </div>
  ) : (
    <Navigate
      to='/login'
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default LayoutContainer;
