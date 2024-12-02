// Import routing objects
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Imports the style
import './main.css';

// Import Initial section pages
import Inicio from './inicio/pages/Inicio/Inicio.jsx';
import Login from './inicio/pages//Login/Login';
import Menu from './inicio/pages/menu-principal/MainMenu.jsx';
import Tutorial from './inicio/pages//Tutorial/Tutorial';

// Import Acidification pages
import Acidification from './acidification/pages/ocean-acidification/Acidification.jsx';
import AcidificationInfo from "./acidification/pages/ocean-acidification-info/AcidificationInfoPage";

// Import Scarcity pages
import Scarcity from './scarcity/pages/main.jsx'
import ScarcityInfo from './scarcity/pages/info.jsx'

// Import Pollution pages
import Pollution from './pollution/pages/main/PollutionPage.jsx';
import PollutionInfo from './pollution/pages/info/PollutionInfo.jsx'

// Import Error pages
import Error404 from './components/404/404.jsx'


// Define the routing
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
    path: '/Menu',
    element: <Menu />
  },
  {
    path: '/Tutorial',
    element: <Tutorial />
  },
  {
    path: '/Menu/Acidificacion',
    element: <Acidification />
  },
  {
    path: '/Menu/Acidificacion/Info',
    element: <AcidificationInfo />
  },
  {
    path:'/Menu/Escasez',
    element: <Scarcity/>
  },
  {
    path: '/Menu/Escasez/Info',
    element: <ScarcityInfo/>
  },
  {
    path: '/Menu/Contaminacion',
    element: <Pollution />
  },
  {
    path: '/Menu/Contaminacion/Info',
    element: <PollutionInfo />
  },
  {
    path: '*',
    element: <Error404 />
  }
]);

// Creates the interface
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
