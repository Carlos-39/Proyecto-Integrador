import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Login from './pages/Login/Login'
import Escene from './Escene'

// route handler entry point
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/Escene',
    element: <Escene />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
