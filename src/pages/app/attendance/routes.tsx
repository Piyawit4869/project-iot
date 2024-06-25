import AttendanceIndex from "./Indexpage";


export const routes = [
  {
    path: "attendance",
    children: [
      {
        path: "",
        element: <AttendanceIndex />,
      },
    ],
  },
];
