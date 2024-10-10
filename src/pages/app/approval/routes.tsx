import { ApprovalIndex, approvalLoader } from './Indexpage';

export const routes = [
  {
    path: 'approval',
    loader: approvalLoader,
    element: <ApprovalIndex />,
  },
];
