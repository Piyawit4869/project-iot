import { createBrowserRouter } from 'react-router-dom';

import { Root, RootLoader } from './pages/Roots';
import { AppLayout, layoutLoader } from './layout';
import { routes as appRoutes } from './pages/app';
import { routes as publicRoutes } from './pages/public';
import { routes as adminRoutes } from './pages/superadmin';
import { Login, loginAction } from './pages/Login';
import { Receipt } from './pages/Receipt';

export const router = createBrowserRouter([
  // ...loginRouute,
  {
    path: '/login',
    element: <Login />,
    // loader: loginLoader,
    action: loginAction,
  },
  {
    path: '/receipt',
    element: <Receipt />,
  },
  {
    path: '/',
    element: <Root />,
    loader: RootLoader,
    children: [
      {
        path: '/public',
        // element: <Root />,
        children: [...publicRoutes],
      },
      {
        path: '/admin',
        element: <AppLayout />,
        children: [...adminRoutes],
      },

      {
        path: '',
        element: <AppLayout />,
        loader: layoutLoader,
        children: [...appRoutes],
      },
    ],
  },
]);
