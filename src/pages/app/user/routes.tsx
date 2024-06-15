import { UsersCreate } from "./createpage";
import { UsersIndex } from "./indexpage";
import { UsersSingle } from "./singlepage";

export const routes = [
  {
    path: "user",
    children: [
      {
        path: "",
        element: <UsersIndex/>
      },
      {
        path: "create",
        element: <UsersCreate/>
      },
      {
        path: ":id", 
        element: <UsersSingle/>
      }
    ],
  }
];
