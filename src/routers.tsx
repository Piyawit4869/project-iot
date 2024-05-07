import { createBrowserRouter } from "react-router-dom";

import { Root } from "./pages/Roots";

import { routes as loginRouute } from "./pages/login";

export const router = createBrowserRouter([
  ...loginRouute,
  {
    path: "/",
    element: <Root />,
    children: [],
  },
]);
