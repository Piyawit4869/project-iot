import { ProfilePage } from "./profilepage";

export const routes = [
  {
    path: "/profile",
    // element: <PlanningLandingPage />,
    children: [
      {
        path: "",
        element: <ProfilePage />,
      },
    ],
  },
];