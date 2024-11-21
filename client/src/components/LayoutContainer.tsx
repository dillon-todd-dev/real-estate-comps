import { Box, Center, Spinner } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const LayoutContainer = () => {
  const { currentUser, isLoading } = useAuth();

  return isLoading ? (
    <Center w='100vw' h='90vh' flexDir='column'>
      <Spinner mb={4} />
    </Center>
  ) : currentUser ? (
    <Box minH='100vh'>
      <Navbar />
      <Outlet />
    </Box>
  ) : (
    <Navigate
      to='/login'
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default LayoutContainer;
