import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './main.css';
import Inicio from './pages/Inicio/Inicio';
import Login from './pages/Login/Login';
import MainMenu from './pages/Menu_Principal/MainMenu';
import Tutorial from './pages/Tutorial/Tutorial';
import Acidification from './pages/ocean-acidification/Acidification';
import AcidificationInfoPage from "./pages/ocean-acidification-info/AcidificationInfoPage";
import Scarcity from './pages/scarcity/scarcity-main.jsx';
import PollutionPage from './pages/pollutionPage/PollutionPage';

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
    path: '/Acidification',
    element: <Acidification />
  },
  {
    path: '/AcidificationInfoPage',
    element: <AcidificationInfoPage />
  },
  {
    path:'/MainMenu/Scarcity',
    element: <Scarcity/>
  },
  {
    path: '/PollutionPage',
    element: <PollutionPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
