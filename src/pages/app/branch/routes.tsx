import { BranchCreate } from './Createpage';
import { BranchIndex } from './Indexpage';
import { branchLoader } from './loader';
import { BranchSingle } from './singlepage';

export const routes = [
  {
    path: 'branch',
    children: [
      {
        path: '',
        element: <BranchIndex />,
        loader: branchLoader,
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
