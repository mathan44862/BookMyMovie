import { useRoutes } from 'react-router-dom';
import Login from '../components/Login';

import React from 'react';
import Home from '../components/Home';
import Screens from '../components/Screens';
import SignUp from '../components/Signup';
import Shows from '../components/Shows';
import Seats from '../components/Shows/Seats';
import Payment from '../components/Payment';

const MyRoutes: React.FC = () => {
  const element = useRoutes([
    {
      path: '/',
      element: (
        <Login></Login>
      ),
      children: []
    },
    {
        path: '/signup',
        element: (
          <SignUp></SignUp>
        ),
        children: []
    },
    {
        path: '/home',
        element: (
          <Home></Home>
        ),
        children: []
    },
    {
      path: '/screens',
      element: (
        <Screens></Screens>
      ),
      children: []
  },{
    path: '/shows',
      element: (
        <Shows></Shows>
      ),
      children: []
  }
  ,{
    path: '/payment',
      element: (
        <Payment></Payment>
      ),
      children: []
  }
  ]);
  return element;

};

export default MyRoutes;