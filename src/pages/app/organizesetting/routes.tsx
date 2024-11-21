import { organizeSingleAction, organizeSingleLoader } from './action';
import { OrganizeSingle } from './OrganizeSingle';

export const routes = [
  {
    path: 'information',
    loader: organizeSingleLoader,
    action: organizeSingleAction,
    element: <OrganizeSingle />,
  },
];
