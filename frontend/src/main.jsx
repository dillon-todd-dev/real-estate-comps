import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AuthProvider from './providers/authProvider';
import Routes from './routes';
import { AlertProvider } from './providers/alertProvider';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <AlertProvider>
                <Routes />
            </AlertProvider>
        </AuthProvider>
    </StrictMode>
);
