import { organizeSingleAction, organizeSingleLoader } from './action';
import { AddressCreate } from './AddressCreate';
import { AddressIndex } from './AddressIndex';
import { AddressSingle } from './AddressSingle';
import { OrganizeSingle } from './OrganizeSingle';
import { SystemCreate } from './SystemCreate';
import { SystemIndex } from './SystemIndex';
import { SystemSingle } from './SystemSingle';

export const routes = [
  {
    path: 'information',
    loader: organizeSingleLoader,
    action: organizeSingleAction,
    element: <OrganizeSingle />,
  },
  {
    path: 'address',
    element: <AddressIndex />,
  },
  { path: 'address/create', element: <AddressCreate /> },
  { path: 'address/:id', element: <AddressSingle /> },
  { path: 'system', element: <SystemIndex /> },
  { path: 'system/create', element: <SystemCreate /> },
  { path: 'system/:id', element: <SystemSingle /> },
];
