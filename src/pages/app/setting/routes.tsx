import { SettingIndex } from "./Setting";

export const routes = [
  {
    path: "setting",
    children: [
      {
        path: "",
        element: <SettingIndex />,
      },
    ],
  },
];
