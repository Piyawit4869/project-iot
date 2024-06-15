import { NotationIndex } from "./indexpage";

export const routes = [
  {
    path: "notation",
    // element: <PlanningLandingPage />,
    children: [
      {
        path: "",
        element: <NotationIndex />,
      },
      {
        path: "create",
        element: <>NotationCreate</>
      },
      {
        path: ":id", 
        element: <>NotationSingle</>
      },
    ],
  },
];
