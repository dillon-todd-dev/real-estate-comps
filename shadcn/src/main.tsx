import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ThemeProvider from '@/components/theme-provider.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/config/client-query';
import Routes from '@/routes/routes';
import '@/index.css';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Toaster position='bottom-right' richColors />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
