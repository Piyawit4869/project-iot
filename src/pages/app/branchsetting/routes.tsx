0
import { BranchSingle } from "./singlepage";

export const routes = [
  {
    path: "information",
    children: [
      {
        path: "", 
        element: <BranchSingle/>
      }
    ],
  }
];