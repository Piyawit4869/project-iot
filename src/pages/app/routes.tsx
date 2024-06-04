import { LoginPage } from "./auth";
import { AppLandingPage } from "./indexpage";

import { routes as planningRoute } from "./planning";
import { routes as notationRoute } from "./notation";
import { routes as attendanceRoute } from "./attendance";
import { routes as userRoute } from "./user";
import { routes as projectpageRoute } from "./projectpage";

export const routes = [
  {
    path: "",
    element: <AppLandingPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  ...planningRoute,
  ...notationRoute,
  ...attendanceRoute,
  ...userRoute,
  ...projectpageRoute,
];
