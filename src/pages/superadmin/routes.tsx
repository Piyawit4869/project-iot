import { routes as organizeRoute } from './organize';
import { routes as analyticRoute } from './analytic';
import { routes as employeeRoute } from './employee';

export const routes = [...organizeRoute, ...analyticRoute, ...employeeRoute];
