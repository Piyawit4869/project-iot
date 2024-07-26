import { ProjectCreate } from './Createpage';
import { ProjectIndex } from './Indexpage';
import { ProjectSingle } from './Singlepage';
export const routes = [
  {
    path: 'project',
    children: [
      {
        path: '',
        element: <ProjectIndex />,
      },
      {
        path: 'create',
        element: <ProjectCreate />,
      },
      {
        path: ':id',
        element: <ProjectSingle />,
      },
    ],
  },
];
