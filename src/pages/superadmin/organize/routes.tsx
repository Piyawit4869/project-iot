import { OrganizeCreate } from './Createpage';
import { OrganizeIndex } from './Indexpage';
import { OrganizeSingle } from './Singlepage';
import { organizeCreateAction, organizeSingleAction } from './action';
import { organizeLoader, organizeSingleLoader } from './loader';

export const routes = [
  {
    path: 'organize',
    children: [
      {
        path: '',
        element: <OrganizeIndex />,
        loader: organizeLoader,
      },
      {
        path: 'create',
        element: <OrganizeCreate />,
        action: organizeCreateAction,
      },
      {
        path: ':id',
        element: <OrganizeSingle />,
        loader: organizeSingleLoader,
        action: organizeSingleAction,
      },
    ],
  },
];
