import Login from '@/pages/Login';
import { useAuth } from '@/context/authProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Properties from '@/pages/Properties';
import Settings from '@/pages/Settings';
import Account from '@/pages/Account';
import Preferences from '@/pages/Preferences';

const Routes = () => {
  const { token } = useAuth();

  const routesForNotAuthenticatedOnly = [
    {
      path: '/login',
      element: <Login />
    }
  ];

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/properties',
          element: <Properties />
        },
        {
          path: '/settings',
          element: <Settings />
        }
      ]
    }
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
