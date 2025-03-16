
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BusRouteFinder from './page/home/home';
import CenterLayout from './page/CenterLayout';
import Register from './page/auth/register';
import Login from './page/auth/login';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BusRouteFinder />,
    },
    {
      element: <CenterLayout />,
      children: [

        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        }
      ],
    },
  ])


  return (

    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App