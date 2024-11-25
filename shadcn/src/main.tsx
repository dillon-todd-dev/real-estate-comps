import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ThemeProvider from '@/components/theme-provider.tsx';
import '@/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/config/client-query';
import Routes from '@/routes/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
