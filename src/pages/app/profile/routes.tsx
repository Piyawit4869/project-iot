import { profileAction, profileLoader, ProfilePage } from './Indexpage';

export const routes = [
  {
    path: '/profile',
    loader: profileLoader,
    action: profileAction,
    element: <ProfilePage />,
  },
];
