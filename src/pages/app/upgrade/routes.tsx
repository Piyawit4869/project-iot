<<<<<<< HEAD
import { Upgrade } from "./upgrade";
=======
import { UpgradeIndex } from "./Indexpage";
>>>>>>> c7073be392610c957bb66cc90773a2e2440d69bd

export const routes = [
  {
    path: "upgrade",
<<<<<<< HEAD
    children: [
      {
        path: "",
        element: <Upgrade />,
      },
=======
    
    children: [
      {
        path: "",
        element: <UpgradeIndex />,
      },
     
>>>>>>> c7073be392610c957bb66cc90773a2e2440d69bd
    ],
  },
];
