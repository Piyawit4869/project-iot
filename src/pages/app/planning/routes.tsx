import { PlanningIndex } from './Indexpage';

export const routes = [
  {
    path: 'planning',
    // element: <Planning />,
    children: [
      {
        path: '',
        element: <PlanningIndex />,
      },
      {
        path: 'create',
        element: <>PlanningCreate</>,
      },
      {
        path: ':id',
        element: <>PlanningSingle</>,
      },
    ],
  },
];
