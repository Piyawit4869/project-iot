import { OrganizeSingle } from "./OrganizeSingle";

export const routes = [
  {
    path: "orginformation",
    children: [
      {
        path: "",
        element: <OrganizeSingle />,
      },
    ],
  },
];
