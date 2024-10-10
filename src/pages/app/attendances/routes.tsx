import { AttendanceIndex, indexLoader } from './attendance-index';
import { AttendanceAction } from './attendance-action/Indexpage';
import { AttendanceOverview } from './attendance-overview';
import { attendanceLoader } from './attendance-action/loader';
import { AttendanceCreate } from './attendance-create';
import { attendanceEditAction } from './attendance-edit/action';
import { attendanceCreateAction } from './attendance-create/action';
import { userLoader } from '../user/loader';
import { AttendanceEdit, attendanceEditLoader } from './attendance-edit';
import { attendanceAction } from './attendance-action/action';

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
        loader: attendanceLoader,
        action: attendanceAction,
        element: <AttendanceAction />,
      },
      {
        path: 'attendance-overview',
        element: <AttendanceOverview />,
      },
      {
        path: 'create',
        action: attendanceCreateAction,
        element: <AttendanceCreate />,
        children: [
          {
            path: 'user-search',
            loader: userLoader,
          },
        ],
      },
      {
        path: ':id',
        loader: attendanceEditLoader,
        action: attendanceEditAction,
        element: <AttendanceEdit />,
      },
    ],
  },
];
