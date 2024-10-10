import { profileAction, profileLoader, ProfilePage } from './Indexpage';

export const routes = [
  {
    path: '/profile',
    children: [
      {
        path: '',
        loader: profileLoader,
        action: profileAction,
        element: <ProfilePage />,
      },
    ],
  },
];
