import { Dashboard } from "./indexpage";

export const routes = [
  {
    path: "dashboard",
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
];
