import { PlanningLandingPage } from "./indexpage";

export const routes = [
  {
    path: "/planning",
    // element: <PlanningLandingPage />,
    children: [
      {
        path: "",
        element: <PlanningLandingPage />,
      },
    ],
  },
];
