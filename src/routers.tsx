import { createBrowserRouter } from "react-router-dom";

import { Root } from "./pages/Roots";
import { AppLayout } from "./layout";

import { routes as appRoutes } from "./pages/app";
import { routes as publicRoutes } from "./pages/public";

export const router = createBrowserRouter([
  // ...loginRouute,
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
