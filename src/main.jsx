import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Inicio from './pages/Inicio/Inicio'
import Login from './pages/Login/Login'
import MainMenu from './pages/Menu_Principal/MainMenu' 
// import Escene from './pages/cloud/Escene'
import NotFound from './pages/Not-Found/NotFound'
import Tutorial from './pages/Tutorial/Tutorial'

// route handler entry point
const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/MainMenu',
    element: <MainMenu />
  },
  {
    path: '*',
    element: <NotFound/>
  },
  {
    path: '/Tutorial',
    element: <Tutorial />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
