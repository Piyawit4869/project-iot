import { AttendanceIndex, indexLoader } from './attendance-index';
import { AttendanceAction } from './attendance-action/Indexpage';
import { AttendanceOverview } from './attendance-overview';
import { indexActionLoader } from './attendance-action/loader';

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
        path: 'action',
        loader: indexActionLoader,
        element: <AttendanceAction />,
      },
      {
        path: 'attendance-overview',
        element: <AttendanceOverview />,
      },
    ],
  },
];
