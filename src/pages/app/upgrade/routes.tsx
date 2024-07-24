import { UpgradeIndex } from './Indexpage';

export const routes = [
  {
    path: 'upgrade',

    children: [
      {
        path: '',
        element: <UpgradeIndex />,
      },
    ],
  },
];
