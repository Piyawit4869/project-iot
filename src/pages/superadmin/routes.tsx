import {
  OrganizeCreate,
  OrganizeIndex,
  OrganizeSingle,
  organizeCreateAction,
  organizeLoader,
  organizeSingleAction,
  organizeSingleLoader,
} from "./organize";

export const routes = [
  {
    path: "organize",
    // for get
    loader: organizeLoader,
    // for post , put , delete
    // action : organizeAction,
    element: <OrganizeIndex />,
  },
  {
    path: "organize/create",
    element: <OrganizeCreate />,
    action: organizeCreateAction,
  },
  {
    path: "organize/:id",
    element: <OrganizeSingle />,
    loader: organizeSingleLoader,
    action: organizeSingleAction,
  },
];
