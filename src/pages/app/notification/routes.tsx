import { NotificationIndex } from './Indexpage';

export const routes = [
  {
    path: 'notification',
    children: [
      {
        path: '',
        element: <NotificationIndex />,
      },
    ],
  },
];
