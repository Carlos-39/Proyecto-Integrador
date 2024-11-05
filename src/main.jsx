import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './main.css';
import Inicio from './pages/Inicio/Inicio';
import Login from './pages/Login/Login';
import MainMenu from './pages/Menu_Principal/MainMenu';
import Tutorial from './pages/Tutorial/Tutorial';
import AcidificationPage from './pages/ocean-acidification/AcidificationPage';
import AcidificationInfoPage from "./pages/ocean-acidification-info/AcidificationInfoPage";

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
    path: '/Tutorial',
    element: <Tutorial />
  },
  {
    path: '/AcidificationPage',
    element: <AcidificationPage />
  },
  {
    path: '/AcidificationInfoPage',
    element: <AcidificationInfoPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
