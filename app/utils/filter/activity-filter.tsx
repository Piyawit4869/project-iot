import type { FilterField } from "~/types/global";

export const ActivityFilterFields: FilterField[] = [
  { id: "name", label: "ชื่อ", kind: "text", showIn: "main" },
  { id: "email", label: "อีเมล", kind: "text", showIn: "main" },
  {
    id: "event",
    label: "Event",
    kind: "select",
    showIn: "main",
    options: [
      {
        label: "Sign In",
        value: "sign_in",
      },
      {
        label: "Sign Out",
        value: "sign_out",
      },
    ],
  },
  {
    id: "createdAt",
    label: "วันที่เข้าสู่ระบบ",
    kind: "dateRange",
    showIn: "advanced",
  },
  // { id: "toDate", label: "To Date", kind: "dateRange" },
];
