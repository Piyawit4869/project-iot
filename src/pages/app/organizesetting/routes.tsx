import { OrganizeSingle } from './OrganizeSingle';

export const routes = [
  {
    path: 'information',
    children: [
      {
        path: '',
        element: <OrganizeSingle />,
      },
    ],
  },
];
