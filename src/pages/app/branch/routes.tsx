import { branchCreateAction } from './action';
import { BranchCreate } from './Createpage';
import { BranchIndex } from './Indexpage';
import { branchLoader, branchSingleLoader } from './loader';
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
        action: branchCreateAction,
      },
      {
        path: ':id',
        element: <BranchSingle />,
        loader: branchSingleLoader,
        action: branchCreateAction,
      },
    ],
  },
];
