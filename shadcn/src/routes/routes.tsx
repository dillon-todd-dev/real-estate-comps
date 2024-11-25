import LoginTest from '@/pages/login-test';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginTest />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
