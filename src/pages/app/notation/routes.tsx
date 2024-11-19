import { NotationCreate } from './Createpage';
import { NotationIndex } from './Indexpage';
import { notationsLoader } from './loader';
import { NotationSingle } from './Singlepage';

export const routes = [
  {
    path: 'notation',
    // element: <PlanningLandingPage />,
    children: [
      {
        path: '',
        element: <NotationIndex />,
        loader: notationsLoader,
      },
      {
        path: 'create',
        element: <NotationCreate />,
      },
      {
        path: ':id',
        element: <NotationSingle />,
      },
    ],
  },
];
