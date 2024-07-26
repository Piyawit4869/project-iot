import { LoginPage } from './Login';
import { LoginAction } from './action';

export const routes = [
  {
    path: '/login',
    action: LoginAction,
    element: <LoginPage />,
  },
];
