import { ApprovalIndex } from './Indexpage';

export const routes = [
  {
    path: 'approval',
    children: [
      {
        path: '',
        element: <ApprovalIndex />,
      },
    ],
  },
];
