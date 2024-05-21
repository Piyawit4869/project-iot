import { OrganizeCreate, OrganizeIndex, organizeLoader } from "./organize";
import OrganizeEdit from "./organizenew/OrganizeEdit";
import OrganizeCreate1 from "./organizenew/OrganizeCreate";

export const routes = [
  {
    path: "organize",
    loader: organizeLoader,
    // action : organizeAction,
    element: <OrganizeIndex />,
  },
  {
    path: "organize/create",
    element: <OrganizeCreate />,
  },

  {
    path: "organize/create-new",
    element: <OrganizeCreate1 />,
  },
  {
    path: "organize/update-new",
    element: <OrganizeEdit />,
  },
];
