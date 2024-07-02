import { OrganizeCreate, organizeCreateAction} from "./Createpage";
import { OrganizeIndex  } from "./Indexpage";
import {OrganizeSingle, organizeSingleAction, organizeSingleLoader} from "./Singlepage";
import { organizeLoader } from "./loader";


export const routes = [
  {
    path: "organize",
    children: [
      {
        path: "",
        element: <OrganizeIndex />,
        loader: organizeLoader,
      },
      {
        path: "create",
        element: <OrganizeCreate />,
        action: organizeCreateAction,
      },
      {
        path: ":id",
        element: <OrganizeSingle />,
        loader: organizeSingleLoader,
    action: organizeSingleAction,
      },
    ],
  },
];
