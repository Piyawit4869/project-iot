import { AppLandingPage } from "./indexpage";
import { routes as planningRoute } from "./planning";

export const routes = [
  {
    path: "",
    element: <AppLandingPage />,
  },
  ...planningRoute,
];
