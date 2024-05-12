import { NotationLandingPage } from "./indexpage";

export const routes = [
  {
    path: "/notation",
    // element: <PlanningLandingPage />,
    children: [
      {
        path: "",
        element: <NotationLandingPage />,
      },
    ],
  },
];
