import { OrganizeCreate, OrganizeIndex, organizeLoader } from "./organize";

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
  }

];
