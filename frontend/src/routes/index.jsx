import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';
import { ProtectedRoute } from './ProtectedRoute';
import Properties from '../components/Properties';
import Login from '../pages/Login';

const Routes = () => {
    const { token } = useAuth();

    const routesForNotAuthenticatedOnly = [
        {
            path: '/login',
            element: <Login />,
        },
    ];

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/properties',
                    element: <Properties />,
                },
                {
                    path: '/account',
                    element: <div>Account</div>,
                },
                {
                    path: '/logout',
                    element: <div>Logout</div>,
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
