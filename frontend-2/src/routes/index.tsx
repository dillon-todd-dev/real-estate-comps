import Login from "@/pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />
        }
    ])

    return <RouterProvider router={router} />
}

export default Routes;