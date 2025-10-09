import {
  FileText,
  CheckCircle2,
  UserMinus,
  Ban,
  Trash2,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trash,
} from "lucide-react";
import type { ReactNode } from "react";

export interface UserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdById: string | null;
  updatedBy: string | null;
  updatedById: string | null;
  deletedBy: string | null;
  deletedById: string | null;
  firstName: string;
  lastName: string;
  firstNameTh: string;
  lastNameTh: string;
  emId: string | null;
  prefix: string;
  taxId: string;
  nickName: string;
  nationality: string;
  religion: string;
  weight: number | null;
  height: number | null;
  startWorkDate: string | null;
  endWorkDate: string | null;
  birthDate: string | null;
  educationInformations: any[];
  socialMedia: any[];
  skills: any[];
  workExperiences: any[];
  compensationConfigs: any[];
  documents: any[];
  imageUrl: string;
  isMobile: boolean;
  deviceToken: string;
  phone: string;
  gender: string;
  age: number;
}

export interface Role {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdById: string | null;
  updatedBy: string | null;
  updatedById: string | null;
  deletedBy: string | null;
  deletedById: string | null;
  name: string;
  description: string;
  status: string;
}

export interface Department {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdById: string | null;
  updatedBy: string | null;
  updatedById: string | null;
  deletedBy: string | null;
  deletedById: string | null;
  active: boolean;
  name: string;
  description: string;
  status: string;
  organizationId: string;
}

export interface UserDepartment {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdById: string | null;
  updatedBy: string | null;
  updatedById: string | null;
  deletedBy: string | null;
  deletedById: string | null;
  userId: string;
  departmentId: string;
  department: Department;
}

export interface UserColumn {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdById: string | null;
  updatedBy: string | null;
  updatedById: string | null;
  deletedBy: string | null;
  deletedById: string | null;
  email: string;
  userName: string;
  active: boolean;
  activate: boolean;
  status: string;
  mainDepartment: string | null;
  tempPassword: string | null;
  roleId: string;
  organizationId: string;
  branchId: string;
  orderId: string | null;
  profile: UserProfile;
  role: Role;
  userDepartments: UserDepartment[];
}

export type FilterKind =
  | "text"
  | "select"
  | "boolean"
  | "numberRange"
  | "dateRange";

export type FilterField = {
  id: string;
  path?: string;
  label: ReactNode | string;
  kind: FilterKind;
  options?: { label: string; value: string | number | boolean }[];
  placeholder?: string;
  showOnlyMobile?: boolean;
};

// ค่อยมาเปลี่ยน status
export const UserFilterFields: FilterField[] = [
  { id: "userName", label: "ผู้ติดต่อ", kind: "text" },
  { id: "email", label: "อีเมล", kind: "text" },
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

type extendedUser = {
  active: number;
  churned: number;
  // active_user: number;
  inactive: number;
  suspended: number;
  deleted: number;
  new_user: number;
};

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
