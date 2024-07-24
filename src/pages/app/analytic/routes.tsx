import Analytic from './Indexpage';

export const routes = [
  {
    path: 'analytic',
    // element: <PlanningLandingPage />,
    children: [
      {
        path: '',
        element: <Analytic />,
      },
    ],
  },
];
