import { AnalyticIndex } from "./Analytic";

export const routes = [
  {
    path: "analytic",
    // element: <PlanningLandingPage />,
    children: [
      {
        path: "",
        element: <AnalyticIndex />,
      },
    ],
  },
];
