import { notationCreateAction, notationEditAction } from './action';
import { NotationCreate } from './Createpage';
import { NotationIndex } from './Indexpage';
import { notationLoader, notationsLoader } from './loader';
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
        action: notationCreateAction,
      },
      {
        path: ':id',
        element: <NotationSingle />,
        loader: notationLoader,
        action: notationEditAction,
      },
    ],
  },
];
