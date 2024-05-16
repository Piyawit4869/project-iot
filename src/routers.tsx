import { createBrowserRouter } from "react-router-dom";

import { Root } from "./pages/Roots";
import { AppLayout } from "./layout";

import { routes as appRoutes } from "./pages/app";
import { routes as publicRoutes } from "./pages/public";
import { Login } from "./pages/Login";
import { Receipt } from "./pages/Receipt";
import { Organize } from "./pages/Organize";

export const router = createBrowserRouter([
  // ...loginRouute,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/receipt",
    element: <Receipt />,
  },
  {
    path: "/organize",
    element: <Organize />,
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
        // element: <Root />,
        children: [],
      },

      {
        path: "/",
        element: <AppLayout />,
        children: [...appRoutes],
      },
      
    ],
  },
]);
