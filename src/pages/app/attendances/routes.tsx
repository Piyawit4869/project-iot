import { AttendanceIndex, indexLoader } from './attendance-index';
import { AttendanceAction } from './attendance-action/Indexpage';
import {
  AttendanceOverview,
  singleAttendanceLoader,
} from './attendance-overview';
import { indexActionLoader } from './attendance-action/loader';
import { AttendanceCreate } from './attendance-create';
import { attendanceEditAction } from './attendance-edit/action';
import { attendanceCreateAction } from './attendance-create/action';
import { userLoader } from '../user/loader';
import { AttendanceEdit } from './attendance-edit';

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
        loader: singleAttendanceLoader,
        action: attendanceEditAction,
        element: <AttendanceEdit />,
      },
    ],
  },
];
