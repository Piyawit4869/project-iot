import {
  AlertTriangle,
  Ban,
  CheckCircle,
  CheckCircle2,
  FileText,
  Trash,
  Trash2,
  UserMinus,
  UserPlus,
  XCircle,
} from "lucide-react";
import type { extendedUser } from "./type-user";
import type { FilterField } from "../global";

export const UserFilterFields: FilterField[] = [
  { id: "fullname", label: "ชื่อ", kind: "text", showIn: "main" },
  { id: "email", label: "อีเมล", kind: "text", showIn: "main" },
  { id: "emId", label: "รหัสพนักงาน", kind: "text", showIn: "main" },
  {
    id: "active",
    label: "เปิดใช้งาน / ปิดใช้งาน",
    kind: "select",
    showIn: "main",
    options: [
      { label: "เปิดใช้งาน", value: "true" },
      { label: "ปิดใช้งาน", value: "false" },
    ],
  },
  { id: "phone", label: "เบอร์โทรศัพท์", kind: "text", showIn: "main" },
  {
    id: "gender",
    label: "เพศ",
    kind: "select",
    showIn: "main",
    options: [
      { label: "ชาย", value: "male" },
      { label: "หญิง", value: "female" },
      { label: "ไม่ระบุ", value: "not_specified" },
    ],
  },
  // { id: "updatedBy", label: "ผู้ที่แก้ไข", kind: "text", showIn: "advanced" },
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
  {
    id: "status",
    label: "สถานะ",
    kind: "select",
    options: [
      { label: "ใช้งานอยู่", value: "active" },
      { label: "พนักงานงานใหม่", value: "new_user" },
      { label: "พนักงานที่ไม่ใช้งานมานาน", value: "inactive" },
      { label: "พนักงานที่ถูกระงับการใช้งาน", value: "suspended" },
      { label: "พนักงานที่ลบบัญชีออกจากระบบ", value: "deleted" },
    ],
    showOnlyMobile: true,
  },
];

export const TabIndexTableUser = (user: extendedUser) => {
  const total =
    (user?.active ?? 0) +
    (user?.churned ?? 0) +
    // (user?.active_user ?? 0) +
    (user?.inactive ?? 0) +
    (user?.suspended ?? 0) +
    (user?.deleted ?? 0) +
    (user?.new_user ?? 0);

  const tabs = [
    {
      label: "ทั้งหมด",
      value: total,
      icon: <FileText className="w-4 h-4" />,
      status: "all",
    },
    {
      label: "ใช้งานอยู่",
      value: user?.active ?? 0,
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
      status: "active",
      color: "text-green-600",
    },
    {
      label: "พนักงานงานใหม่",
      value: user?.new_user ?? 0,
      icon: <UserPlus className="w-4 h-4 text-blue-600" />,
      status: "new_user",
      color: "text-blue-600",
    },

    // {
    //   label: "เปิดใช้งาน",
    //   value: user?.active_user ?? 0,
    //   icon: <UserCheck className="w-4 h-4 text-emerald-600" />,
    //   status: "active_user",
    //   color: "text-emerald-600",
    // },
    {
      label: "พนักงานที่ไม่ใช้งานมานาน",
      value: user?.inactive ?? 0,
      icon: <UserMinus className="w-4 h-4 text-gray-500" />,
      status: "inactive",
      color: "text-gray-500",
    },
    {
      label: "พนักงานที่ถูกระงับการใช้งาน",
      value: user?.suspended ?? 0,
      icon: <Ban className="w-4 h-4 text-orange-600" />,
      status: "suspended",
      color: "text-orange-600",
    },
    {
      label: "พนักงานที่ลบบัญชีออกจากระบบ",
      value: user?.deleted ?? 0,
      icon: <Trash2 className="w-4 h-4 text-red-600" />,
      status: "deleted",
      color: "text-red-600",
    },
  ];

  return tabs;
};

export const statusMap: Record<
  string,
  { label: string; className: string; icon?: React.ReactNode }
> = {
  new_user: {
    label: "ผู้ใช้งานใหม่",
    className: "border-transparent bg-[#FFBE3D] text-black",
    icon: <UserPlus />,
  },
  active: {
    label: "พนักงานปัจจุบัน",
    className: "border-transparent bg-[#00A57C] text-white",
    icon: <CheckCircle />,
  },
  inactive: {
    label: "ผู้ใช้ที่ไม่ใช้งานมานาน",
    className: "border-transparent bg-[#D9D9D9] text-black",
    icon: <XCircle />,
  },
  suspended: {
    label: "ผู้ใช้ที่ถูกระงับการใช้งาน",
    className: "border-transparent bg-[#ED4949] text-white",
    icon: <AlertTriangle />,
  },
  deleted: {
    label: "ผู้ใช้ที่ลบบัญชีออกจากระบบ",
    className: "border-transparent bg-secondary text-black",
    icon: <Trash />,
  },
};
