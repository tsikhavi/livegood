// src/app/providers/Router/AppRouter.tsx
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes as createRoutes } from '@/shared/config/routeConfig/routes';

interface AppRouterProps {
  isAllowedToClick: boolean;
}

export const AppRouter: React.FC<AppRouterProps> = ({ isAllowedToClick }) => {
  // Generate routes based on isAllowedToClick
  const router = createBrowserRouter(createRoutes(isAllowedToClick));

  return <RouterProvider router={router} />;
};
