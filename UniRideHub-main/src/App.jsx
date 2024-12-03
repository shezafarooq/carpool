import { useState} from 'react'
import './App.css'
import Home from './pages/Home';
import Profile from './pages/Profile';
import RequestedRide from './pages/RequestedRide';
import RideCreation from './pages/RideCreation';
import UserAuth from './pages/UserAuth';
import MyRide from './pages/MyRide';
import BookRide from './pages/BookRide';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserState from './Context/UserState';
import RideState from './Context/RideState';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/requestedRide",
    element: <RequestedRide />,
  },
  // other routes defined here
  
  {
    path: "/auth",
    element: <UserAuth />,
  },

  {
    path: "/myride",
    element: <MyRide />,
  },

  {
    path: "/bookride",
    element: <BookRide />,
  },

  {
    path: "/createRide",
    element: <RideCreation />,
  },

]);

function App() {
 
  return (
    <>
      
      <UserState>
        <RideState>
        <RouterProvider router={router} />
        </RideState>
      </UserState>
    </>
  )
}

export default App
