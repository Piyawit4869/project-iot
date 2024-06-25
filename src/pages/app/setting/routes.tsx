import { Setting } from "./indexpage";

export const routes = [
  {
    path: "setting",
    children: [
      {
        path: "",
        element: <Setting />,
      },
    ],
  },
];
