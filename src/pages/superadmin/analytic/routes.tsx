import Analytic from './Indexpage';

export const routes = [
  {
    path: 'analytic',
    children: [
      {
        path: '',
        element: <Analytic />,
      },
    ],
  },
];
