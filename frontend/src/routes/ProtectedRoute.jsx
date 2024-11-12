import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';
import Navbar from '../components/Navbar';

export const ProtectedRoute = () => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};
