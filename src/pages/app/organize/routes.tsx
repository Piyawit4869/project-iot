
import { organizeSingleAction } from "./action";
import { organizeSingleLoader } from "./loader";
import { MyOrganize } from "./singlepage";

export const routes = [
  {
    path: "organize",
    children: [
      {
        path: "", 
        loader: organizeSingleLoader,
        action: organizeSingleAction,
        element: <MyOrganize/>
      }
    ],
  }
];