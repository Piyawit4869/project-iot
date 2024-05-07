import { AttendanceLandingPage } from "./indexpage";

export const routes = [
  {
    path: "/attendance",
    // element: <PlanningLandingPage />,
    children: [
      {
        path: "",
        element: <AttendanceLandingPage />,
      },
    ],
  },
];
