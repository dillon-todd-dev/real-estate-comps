import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './components/LoginForm.jsx'
import SignupForm from './components/SignupForm.jsx'
import Properties from './components/Properties.jsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/signup',
    element: <SignupForm />
  },
  {
    path: '/properties',
    element: <Properties />
  },
  {
    path: '/invalid',
    element: <div>INVALID</div>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
