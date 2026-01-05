import type { FilterField } from "../global";

export const RolesFilterFields: FilterField[] = [
  { id: "name", label: "ชื่อ", kind: "text", showIn: "main" },
  {
    id: "createdAt",
    label: "วันที่สร้าง",
    kind: "dateRange",
    showIn: "advanced",
  },
  {
    id: "updatedAt",
    label: "วันที่แก้ไขล่าสุด",
    kind: "dateRange",
    showIn: "advanced",
  },
];
