import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Routes from './routes/index.tsx';
import AuthProvider from './providers/authProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </StrictMode>
);
