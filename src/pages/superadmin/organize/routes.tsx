import { json } from 'react-router-dom';
import { BranchCreate, BranchSingle } from '../branch';
import { branchCreateAction, branchEditAction } from '../branch/action';
import { branchSingleLoader } from '../branch/loader';
import { OrganizeCreate } from './Createpage';
import { OrganizeIndex } from './Indexpage';
import { OrganizeSingle } from './Singlepage';
import { organizeCreateAction, organizeSingleAction } from './action';
import {
  createOrganizationLoader,
  organizeLoader,
  organizeSingleLoader,
} from './loader';
import * as API from '@src/apis';

export const routes = [
  {
    path: 'organization',
    children: [
      {
        path: '',
        element: <OrganizeIndex />,
        loader: organizeLoader,
      },
      {
        path: 'create',
        element: <OrganizeCreate />,
        loader: createOrganizationLoader,
        action: organizeCreateAction,
      },
      {
        path: ':id',
        element: <OrganizeSingle />,
        loader: organizeSingleLoader,
        action: organizeSingleAction,
      },
      {
        path: ':id/branch/create',
        element: <BranchCreate />,
        action: branchCreateAction,
      },
      {
        path: ':id/branch/:branchId',
        element: <BranchSingle />,
        action: branchEditAction,
        loader: branchSingleLoader,
      },
      {
        path: 'find',
        loader: async (params: any) => {
          const url = new URL(params.request.url);
          const query = url.searchParams;
          const param = Object.fromEntries(query);
          const fieldNames = Object.keys(param);

          console.log({ param });

          const { data: uniqFields } = await API.organize.getUniqFields(param);

          return json({
            org: uniqFields.data,
            name: fieldNames[0],
            entry: param.entry,
          });
        },
      },
    ],
  },
];
