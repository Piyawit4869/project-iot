import { ProfilePage } from './Indexpage';

export const routes = [
  {
    path: '/profile',
    children: [
      {
        path: '',
        element: <ProfilePage />,
      },
    ],
  },
];
