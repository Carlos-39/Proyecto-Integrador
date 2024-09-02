import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Login from './pages/Login/Login'
import Escene from './pages/inicio/Escene'

//elemnt for the error 404 page
const E404 = () =>
{
  //defines the style of the page
  const divStyle =
  {
    width: "100%",
    height: "100%",
    display:"flex",
    backgroundColor: "#BCDAFA",
    justifyContent: "center",
    alignItems: "center",
    color: "#0A131B",
    fontSize: "2vw",
  }

  //define the page element
  return (
  <div style={divStyle}>
    <h1>We couldn't find the page you were looking for</h1>
  </div>);
}

// route handler entry point
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/Escene',
    element: <Escene />
  },
  {
    path: '*',
    element: <E404/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
