import Login from '@/pages/Login';
import { useAuth } from '@/providers/authProvider';
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
          element: <Settings />,
          children: [
            {
              path: '/settings/account',
              element: <Account />
            },
            {
              path: '/settings/preferences',
              element: <Preferences />
            }
          ]
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
