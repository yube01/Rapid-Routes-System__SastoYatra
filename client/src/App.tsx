
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BusRouteFinder from './page/home/home';
import CenterLayout from './page/CenterLayout';
import Register from './page/auth/register';
import Login from './page/auth/login';
import PopularDestinations from './page/home/popular';
import HistoryPage from './page/home/history';
import { Toaster } from './components/ui/sonner';
import Admin from './page/home/admin';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BusRouteFinder />,
    },
    {
      path: "/popular",
      element: <PopularDestinations />,
    },
    {
      path: "/history",
      element: <HistoryPage />,
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
        },
        {
          path: "/admin",
          element: <Admin />,
        }
      ],
    },
  ])


  return (

    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App