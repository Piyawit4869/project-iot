import { OrganizeCreate, OrganizeIndex, organizeLoader } from "./organize";

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
  },
];
