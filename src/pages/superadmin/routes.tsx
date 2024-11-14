import { routes as organizeRoute } from './organize';
import { routes as analyticRoute } from './analytic';
import { routes as employeeRoute } from './employee';
import { routes as branchRoute } from './branch';

export const routes = [
  ...organizeRoute,
  ...analyticRoute,
  ...employeeRoute,
  ...branchRoute,
];
