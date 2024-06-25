import { LoginPage } from "./auth";
import { AppLandingPage } from "./indexpage";
import { routes as dashboardRoute } from "./dashboard";
import { routes as planningRoute } from "./planning";
import { routes as notationRoute } from "./notation";
import { routes as attendanceRoute } from "./attendance";
import { routes as userRoute } from "./user";
import { routes as projectpageRoute } from "./project";
import { routes as customersRoute } from "./customer";
import { routes as branchRoute } from "./branch";
import { routes as profileRoute } from "./profile";
import { routes as settingRoute } from "./setting";
import { routes as upgradeRoute } from "./upgrade";

export const routes = [
  {
    path: "",
    element: <AppLandingPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  ...dashboardRoute,
  ...profileRoute,
  ...settingRoute,
  ...planningRoute,
  ...notationRoute,
  ...attendanceRoute,
  ...userRoute,
  ...projectpageRoute,
  ...customersRoute,
  ...branchRoute,
  ...upgradeRoute,
];
