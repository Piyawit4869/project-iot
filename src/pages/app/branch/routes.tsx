import { BranchCreate } from "./createpage";
import { BranchIndex } from "./indexpage";
import { BranchSingle } from "./singlepage";

export const routes = [
  {
    path: "branch",
    children: [
      {
        path: "",
        element: <BranchIndex/>
      },
      {
        path: "create",
        element: <BranchCreate/>
      },
      {
        path: ":id", 
        element: <BranchSingle/>
      }
    ],
  }
];