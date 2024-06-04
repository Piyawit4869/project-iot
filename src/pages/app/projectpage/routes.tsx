import { ProjectCreate } from "./createpage";
import { ProjectIndex } from "./indexpage";
import { ProjectSingle } from "./singlepage";

export const routes = [
  {
    path: "/project",
    children: [
      {
        path: "",
        element: <ProjectIndex/>
      },
      {
        path: "createproject",
        element: <ProjectCreate/>
      },
      {
        path: "singleproject", 
        element: <ProjectSingle/>
      }
    ],
  }
];