export type User = UserType | null;

export type UserType = {
  id: number;
  displayName: string;
  email: string;
};

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

export type extendedUser = {
  active: number;
  churned: number;
  // active_user: number;
  inactive: number;
  suspended: number;
  deleted: number;
  new_user: number;
};
