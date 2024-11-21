import { Backoffice } from './Backoffice';

export const routes = [
  {
    path: 'backoffice',
    children: [
      {
        path: '',
        element: <Backoffice />,
      },
    ],
  },
];
