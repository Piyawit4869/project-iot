import { LoginPage } from "./auth";
<<<<<<< HEAD
import { AppLandingPage } from "./indexpage";
import { routes as dashboardRoute } from "./dashboard";
=======
import { AppLandingPage } from "./Indexpage";

>>>>>>> c7073be392610c957bb66cc90773a2e2440d69bd
import { routes as planningRoute } from "./planning";
import { routes as notationRoute } from "./notation";
import { routes as attendanceRoute } from "./attendance";
import { routes as userRoute } from "./user";
import { routes as projectpageRoute } from "./project";
import { routes as customersRoute } from "./customer";
import { routes as branchRoute } from "./branch";
import { routes as profileRoute } from "./profile";
import { routes as settingRoute } from "./setting";
<<<<<<< HEAD
import { routes as upgradeRoute } from "./upgrade";

=======
import { routes as analyticRoute } from "./analytic";
import { routes as upgradeRoute } from "./upgrade";
>>>>>>> c7073be392610c957bb66cc90773a2e2440d69bd
export const routes = [
  {
    path: "",
    element: <AppLandingPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
<<<<<<< HEAD
  ...dashboardRoute,
=======
  
>>>>>>> c7073be392610c957bb66cc90773a2e2440d69bd
  ...profileRoute,
  ...settingRoute,
  ...planningRoute,
  ...notationRoute,
  ...attendanceRoute,
  ...userRoute,
  ...projectpageRoute,
  ...customersRoute,
  ...branchRoute,
<<<<<<< HEAD
  ...upgradeRoute,
=======
  ...settingRoute,
  ...analyticRoute,
  ...upgradeRoute
  
>>>>>>> c7073be392610c957bb66cc90773a2e2440d69bd
];
