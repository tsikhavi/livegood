// src/shared/config/routeConfig/routes.ts
import React, { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { AssignmentPage, FriendsPage, MainPage, TransactionsPage } from '@/pages';
import { PageLoader } from '@/shared/ui/PageLoader/PageLoader';

// Helper function to wrap elements with Suspense
const getElement = (element: React.ReactNode) => {
  return <Suspense fallback={ <PageLoader/> }>{ element }</Suspense>;
};

// Function to create routes with conditional rendering based on isAllowedToClick
export const routes = (isAllowedToClick: boolean): RouteObject[] => [
  {
    path: '/',
    element: getElement( <MainPage/> )
  },
  {
    path: '/friends',
    element: getElement( <FriendsPage/> )
  },
  {
    path: '/friends/:username',
    element: getElement( <FriendsPage/> )
  },
  {
    path: '/assignment',
    element: getElement( <AssignmentPage/> )
  },
  {
    path: '/transactions',
    element: isAllowedToClick 
      ? getElement( <TransactionsPage/> )
      : getElement( <MainPage/> ) // Redirect or display an alternative page if not allowed
  },
];
