import {
  OrganizeSingle,
  organizeSingleAction,
  organizeSingleLoader,
} from './OrganizeSingle';

export const routes = [
  {
    path: 'information',
    loader: organizeSingleLoader,
    action: organizeSingleAction,
    element: <OrganizeSingle />,
  },
];
