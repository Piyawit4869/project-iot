import { AppointmentCreate } from './Createpage';
import { AppointmentIndex } from './Indexpage';
import { AppointmentSingle } from './Singlepage';

export const routes = [
  {
    path: 'appointment',
    children: [
      {
        path: '',
        element: <AppointmentIndex />,
      },
      {
        path: 'create',
        element: <AppointmentCreate />,
      },
      {
        path: ':id',
        element: <AppointmentSingle />,
      },
    ],
  },
];
