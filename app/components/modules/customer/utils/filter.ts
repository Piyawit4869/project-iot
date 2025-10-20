import type { ReactNode } from "react";

export type FilterKind =
  | "text"
  | "select"
  | "boolean"
  | "numberRange"
  | "number"
  | "dateRange"
  | "date";

export type FilterField = {
  id: string;
  path?: string;
  label: ReactNode | string;
  kind: FilterKind;
  options?: { label: string; value: string | number | boolean }[];
  placeholder?: string;
  showOnlyMobile?: boolean;
  showIn?: "main" | "advanced" | "both";
};

export const customerFilterFields: FilterField[] = [
  { id: "profile.name", label: "ชื่อ", kind: "text", showIn: "main" },
  // { id: "customerPlatform", label: "Channel", kind: "text" },
  {
    id: "priority",
    label: "ลำดับความสำคัญ",
    kind: "number",
    showIn: "main",
  },
  { id: "tags", label: "Tags", kind: "select", showIn: "main" },
  {
    id: "customerType",
    label: "ประเภทลูกค้า",
    kind: "text",
    showIn: "main",
  },
  { id: "phone", label: "เบอร์โทรศัพท์", kind: "text", showIn: "main" },
  { id: "createdBy", label: "ผู้สร้าง", kind: "text", showIn: "advanced" },
  {
    id: "updatedBy",
    label: "ชื่ผู้ที่แก้ไข",
    kind: "text",
    showIn: "advanced",
  },
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
  // { id: "email", label: "อีเมล", kind: "text" },
  {
    id: "status",
    label: "สถานะ",
    kind: "select",
    options: [
      { label: "ลงทะเบียนใหม่", value: "newly_registered" },
      { label: "ใช้งานอยู่", value: "active" },
      { label: "ลูกค้าประจำ", value: "loyal_customer" },
      { label: "มีความเสี่ยง", value: "at_risk" },
      { label: "ยกเลิกใช้งาน", value: "churned" },
    ],
    showOnlyMobile: true,
  },
  // { id: "active", label: "Active", kind: "boolean" },
  // { id: "isAiReply", label: "AI Reply Enabled", kind: "boolean" },
  // {
  //   id: "customerType",
  //   label: "Customer Type",
  //   kind: "select",
  //   options: [
  //     { label: "Ordinary Person", value: "ordinary_person" },
  //     { label: "Juristic Person", value: "juristic_person" },
  //   ],
  // },
  // {
  //   id: "customerPlatform",
  //   label: "Platform",
  //   kind: "select",
  //   options: [
  //     { label: "Backoffice", value: "backoffice" },
  //     { label: "Line OA", value: "line_oa" },
  //   ],
  // },
  // { id: "priority", label: "Priority", kind: "numberRange" },
  // { id: "progressPercentage", label: "Progress %", kind: "numberRange" },
  // { id: "createdAt", label: "Created", kind: "dateRange" },
  // { id: "updatedAt", label: "Updated", kind: "dateRange" },
  // you can add supports.isMain, supports.userId if they exist as flattened columns
];
