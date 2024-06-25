import {
  organizeSingleAction,
  organizeSingleLoader,
} from "@src/pages/admin/organize";
import { MyOrganize } from "./Singlepage";

export const routes = [
  {
    path: "organize",
    children: [
      {
        path: "",
        loader: organizeSingleLoader,
        action: organizeSingleAction,
        element: <MyOrganize />,
      },
    ],
  },
];
