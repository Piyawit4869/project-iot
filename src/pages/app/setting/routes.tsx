import { SettingIndex } from './Indexpage';

export const routes = [
  {
    path: 'setting',
    children: [
      {
        path: '',
        element: <SettingIndex />,
      },
    ],
  },
];
