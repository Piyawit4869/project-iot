import { UsersCreate } from './createpage';
import { UsersIndex } from './indexpage';
import { userLoader } from './loader';
import { UsersSingle } from './singlepage';

export const routes = [
  {
    path: 'employee',
    children: [
      {
        path: '',
        loader: userLoader,
        element: <UsersIndex />,
      },
      {
        path: 'create',
        element: <UsersCreate />,
      },
      {
        path: ':id',
        element: <UsersSingle />,
      },
    ],
  },
];
