import { AttendanceIndex, indexLoader } from './attendance-index';
import { AttendanceOverview } from './attendance-overview';

export const routes = [
  {
    path: 'attendance',
    children: [
      {
        path: '',
        loader: indexLoader,
        element: <AttendanceIndex />,
      },
      {
        path: 'attendance-overview',
        element: <AttendanceOverview />,
      },
    ],
  },
];
