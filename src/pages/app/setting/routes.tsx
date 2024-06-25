<<<<<<< HEAD
import { Setting } from "./indexpage";
=======
import { SettingIndex } from "./Setting";
>>>>>>> c7073be392610c957bb66cc90773a2e2440d69bd

export const routes = [
  {
    path: "setting",
    children: [
      {
        path: "",
<<<<<<< HEAD
        element: <Setting />,
=======
        element: <SettingIndex />,
>>>>>>> c7073be392610c957bb66cc90773a2e2440d69bd
      },
    ],
  },
];
