import { BranchCreate } from './Createpage';
import { BranchIndex } from './Indexpage';
import { BranchSingle } from './singlepage';

export const routes = [
  {
    path: 'branch',
    children: [
      {
        path: '',
        element: <BranchIndex />,
      },
      {
        path: 'create',
        element: <BranchCreate />,
      },
      {
        path: ':id',
        element: <BranchSingle />,
      },
    ],
  },
];
