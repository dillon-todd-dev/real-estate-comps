import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/context/authProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Dashboard />;
};

export default ProtectedRoute;
