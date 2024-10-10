import { userCreateAction, userEditAction } from './action';
import { UsersCreate } from './createpage';
import { UsersIndex } from './indexpage';
import { userLoader, userSingleLoader } from './loader';
import { UsersSingle } from './singlepage';

export const routes = [
  {
    path: 'user',
    children: [
      {
        path: '',
        loader: userLoader,
        element: <UsersIndex />,
      },
      {
        path: 'create',
        action: userCreateAction,
        element: <UsersCreate />,
      },
      {
        path: ':id',
        loader: userSingleLoader,
        action: userEditAction,
        element: <UsersSingle />,
      },
    ],
  },
];
