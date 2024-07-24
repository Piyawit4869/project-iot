import { CustomerCreate } from './Createpage';
import { CustomerIndex } from './Indexpage';
import { CustomerSingle } from './Singlepage';

export const routes = [
  {
    path: 'customer',
    children: [
      {
        path: '',
        element: <CustomerIndex />,
      },
      {
        path: 'create',
        element: <CustomerCreate />,
      },
      {
        path: ':id',
        element: <CustomerSingle />,
      },
    ],
  },
];
