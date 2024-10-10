import { routes as attendaceDashbaordRoutes } from './attendance-dashboard';
import { LoginPage } from '@src/pages/app/auth';

export const routes = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  ...attendaceDashbaordRoutes,
];
