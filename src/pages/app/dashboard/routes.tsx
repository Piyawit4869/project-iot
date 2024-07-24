import { Dashboard } from './Dashboard';

export const routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
    ],
  },
];
