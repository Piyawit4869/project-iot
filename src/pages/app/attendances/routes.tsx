import { AttendanceIndex, indexLoader } from './attendance-index';

export const routes = [
  {
    path: 'attendance',
    children: [
      {
        path: '',
        loader: indexLoader,
        element: <AttendanceIndex />,
      },
    ],
  },
];
