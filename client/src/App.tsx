
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BusRouteFinder from './page/home/home';
import CenterLayout from './page/CenterLayout';
import Register from './page/auth/register';
import Login from './page/auth/login';
import Test from './page/home/test';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BusRouteFinder />,
    },
    {
      path: "/test",
      element: <Test />,
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