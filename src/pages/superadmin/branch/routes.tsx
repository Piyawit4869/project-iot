import { branchCreateAction, branchEditAction } from './action';
import { BranchCreate } from './Createpage';
import { branchSingleLoader } from './loader';
import { BranchSingle } from './Singlepage';

export const routes = [
  {
    path: 'branch',
    children: [
      { path: 'create', element: <BranchCreate />, action: branchCreateAction },
      {
        path: ':branchId',
        element: <BranchSingle />,
        action: branchEditAction,
        loader: branchSingleLoader,
      },
    ],
  },
];
