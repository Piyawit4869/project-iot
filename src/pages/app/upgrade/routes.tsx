import { Upgrade } from "./upgrade";

export const routes = [
  {
    path: "upgrade",
    children: [
      {
        path: "",
        element: <Upgrade />,
      },
    ],
  },
];
