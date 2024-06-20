import { ProjectCreate } from "./createpage";
import { ProjectIndex } from "./indexpage";
import ProjectSingle from "./singlepage";


export const routes = [
  {
    path: "project",
    children: [
      {
        path: "",
        element: <ProjectIndex/>
      },
      {
        path: "create",
        element: <ProjectCreate/>
      },
      {
        path: ":id", 
        element: <ProjectSingle/>
      }
    ],
  }
];