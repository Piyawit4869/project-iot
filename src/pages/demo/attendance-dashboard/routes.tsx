import {
  attendancePageAction,
  attendancePageLoader,
  AttendancePage,
} from './attendance';
import {
  AppointmentPage,
  appointmentPageAction,
  appointmentPageLoader,
} from './appointment';
import {
  ApprovalPage,
  approvalPageAction,
  approvalPageLoader,
} from './approval';
import {
  AnalyticPage,
  analyticPageAction,
  analyticPageLoader,
} from './analytic';

export const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loader: attendancePageLoader,
        action: attendancePageAction,
        element: <AttendancePage />,
      },
      {
        path: 'appointment',
        loader: appointmentPageLoader,
        action: appointmentPageAction,
        element: <AppointmentPage />,
      },
      {
        path: 'approval',
        loader: approvalPageLoader,
        action: approvalPageAction,
        element: <ApprovalPage />,
      },
      {
        path: 'analytic',
        loader: analyticPageLoader,
        action: analyticPageAction,
        element: <AnalyticPage />,
      },
    ],
  },
];
