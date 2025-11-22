import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import type {
  PermissionControlValues,
  PermissionValuesData,
} from "~/schemas/permission-control/PermissionControl";

export interface PermissionControlFormValues {
  name: string;
  description: string;
  status: string;
  mainSupportId: string;
  mainRoleId: string;
  selectedUserIds: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export type PermissionRole = {
  id: string;
  name: string;
  users: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    description: string;
  }[];
};
export interface ModalUserProps {
  users?: User[];
  value?: string[];
  taken?: string[];
  onChange: (selected: string[]) => void;
  onSave?: (selected: string[]) => void;
  triggerElement?: ReactNode;
}

export interface ModelPermissionControlProps {
  form: UseFormReturn<PermissionControlValues>;
  roles: { id: string; name: string }[];
  initialName: string;
  onSaveName: (newName: string) => void;
  onClose: () => void;
}

export interface ModelPermission {
  name: string;
  form: UseFormReturn<PermissionControlValues>;
  roles: { id: string; name: string }[];
  initialName: string;
  onSaveName: (newName: string) => void;
  onClose: () => void;
}

export type RoleData = {
  label: string;
  onOpenModal?: (cb: (name: string) => void) => void;
};

export type UserData = {
  label: string;
  description: string;
  photoUrl: string;
  onOpenModal?: (cb: (name: string) => void) => void;
};

export type AddUserTriggerProps = {
  users: User[];
  takenIds: string[];
  onSave: (ids: string[]) => void;
  className?: string;
};

export interface RoleDatas {
  label: string;
  onOpenModal: (cb: (name: string) => void) => void;
  onOpenProfile: (userId: string) => void;
}

export interface UserDatas {
  label: string;
  description: string;
  photoUrl: string;
  onOpenProfile: (userId: string) => void;
  onOpenModal: (cb: (name: string) => void) => void;
}

export interface UserProfile {
  id: string;
  photoUrl?: string;
  name: string;
  mainRole: string;
  position: string;
  traits: string[];
  email: string;
  gender: string;
  phone: string;
  startDate: string;
  address: string;
}

export interface UserProfileCardProps {
  data: UserProfile;
  onDelete?: (id: string) => void;
  onChangeRole?: (id: string) => void;
}

export interface AddRoleButtonProps {
  onAdd: () => void;
  className?: string;
  label?: string;
}

export interface PermissionControlFormCreateProps {
  form: UseFormReturn<PermissionValuesData>;
  loading?: boolean;
}
