import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Properties from "../pages/Properties";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import ResetPassword from "../pages/ResetPassword";

const Routes = () => {
  const { token } = useAuth();

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    }
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/properties",
          element: <Properties />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
