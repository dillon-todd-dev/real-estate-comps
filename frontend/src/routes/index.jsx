import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import SignupForm from "../components/SignupForm";
import Properties from "../components/Properties";
import Login from "../pages/Login";

const Routes = () => {
    const { token } = useAuth();

    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <div>Home Page</div>
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <SignupForm />
        }
    ]

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
                    path: '/logout',
                    element: <div>Logout</div>
                }
            ]
        }
    ]

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly
    ])

    return <RouterProvider router={router} />
}

export default Routes;