0;
import { BranchSingle } from './singlepage';

export const routes = [
  {
    path: 'information-branch',
    children: [
      {
        path: '',
        element: <BranchSingle />,
      },
    ],
  },
];
