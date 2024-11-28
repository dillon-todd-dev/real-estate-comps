import LayoutContainer from '@/components/layout-container';
import EmailVerification from '@/pages/email-verification';
import ForgotPassword from '@/pages/forgot-password';
import Login from '@/pages/login';
import Register from '@/pages/register';
import ResetPassword from '@/pages/reset-password';
import Settings from '@/pages/settings';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutContainer />,
      children: [
        {
          path: '/settings',
          element: <Settings />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/password/forgot',
      element: <ForgotPassword />,
    },
    {
      path: '/password/reset',
      element: <ResetPassword />,
    },
    {
      path: '/email/verify/:code',
      element: <EmailVerification />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
