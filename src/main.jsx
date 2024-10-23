import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login/Login'
import Escene from './pages/cloud/Escene'
import NotFound from './pages/Not-Found/NotFound'
import Inicio from './pages/inicio/Inicio.jsx'

// route handler entry point
const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/Escene',
    element: <Escene />
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
