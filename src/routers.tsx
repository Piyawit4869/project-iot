import { createBrowserRouter } from "react-router-dom";

import { Root } from "./pages/Roots";
import { AppLayout } from "./layout";

import { routes as appRoutes } from "./pages/app";
import { routes as publicRoutes } from "./pages/public";
import { routes as adminRoutes } from "./pages/admin";
import { Login, loginAction } from "./pages/Login";
import { Receipt } from "./pages/Receipt";

export const router = createBrowserRouter([
  // ...loginRouute,
  {
    path: "/login",
    element: <Login />,
    // loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/receipt",
    element: <Receipt />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/public",
        // element: <Root />,
        children: [...publicRoutes],
      },
      {
        path: "/admin",
        element: <AppLayout />,
        children: [...adminRoutes],
      },

      {
        path: "/",
        element: <AppLayout />,
        children: [...appRoutes],
      },
    ],
  },
]);
