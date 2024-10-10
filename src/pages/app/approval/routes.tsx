import { approvalAction, ApprovalIndex, approvalLoader } from './Indexpage';

export const routes = [
  {
    path: 'approval',
    loader: approvalLoader,
    action: approvalAction,
    element: <ApprovalIndex />,
  },
];
