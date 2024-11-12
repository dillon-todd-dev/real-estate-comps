import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './providers/authProvider'
import Routes from './routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </StrictMode>,
)
