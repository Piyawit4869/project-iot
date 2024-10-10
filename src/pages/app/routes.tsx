import { LoginPage } from './auth';
import { AppLandingPage } from './Indexpage';
import { routes as planningRoute } from './planning';
import { routes as notationRoute } from './notation';
import { routes as attendanceRoute } from './attendances';
import { routes as userRoute } from './user';
import { routes as projectpageRoute } from './project';
import { routes as customersRoute } from './customer';
import { routes as branchRoute } from './branch';
import { routes as profileRoute } from './profile';
import { routes as settingRoute } from './setting';
import { routes as analyticRoute } from './analytic';
import { routes as upgradeRoute } from './upgrade';
import { routes as informationRoute } from './branchsetting';
import { routes as orginformationRoute } from './organizesetting';
import { routes as appointmentRoute } from './appointment';
import { routes as approvalRoute } from './approval';

export const routes = [
  {
    path: '',
    element: <AppLandingPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  ...profileRoute,
  ...planningRoute,
  ...notationRoute,
  ...attendanceRoute,
  ...appointmentRoute,
  ...approvalRoute,
  ...userRoute,
  ...projectpageRoute,
  ...customersRoute,
  ...branchRoute,
  ...settingRoute,
  ...analyticRoute,
  ...upgradeRoute,
  ...informationRoute,
  ...orginformationRoute,
];
