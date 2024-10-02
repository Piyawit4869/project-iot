import { OrganizeSingle, organizeSingleLoader } from './OrganizeSingle';

export const routes = [
  {
    path: 'information',
    children: [
      {
        path: '',
        loader: organizeSingleLoader,
        element: <OrganizeSingle />,
      },
    ],
  },
];
