// import { UsersCreate } from "./createpage";
// import { UsersIndex } from "./indexpage";
// import { UsersSingle} from "./single";

// export const routes = [
//   {
//     path: "/users",
//     children: [
//       {
//         path: "",
//         element: <UsersIndex/>
//       },
//       {
//         path: "create",
//         element: <UsersCreate/>
//       },
//       {
//         path: "single",
//         element: <UsersSingle/>
//       }
//     ],
//   }
// ];

import { UsersCreate } from "./createpage";
import { UsersIndex } from "./indexpage";
import UsersSingle from "./single";

export const routes = [
  {
    path: "/users",
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
        path: "single", 
        element: <UsersSingle/>
      }
    ],
  }
];
