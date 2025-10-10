import { ThirdParty } from "~/components/modules/settings/third-party";
export type TabKey = "SettingOrganization" | "SettingAddress" | "Setting";

export type OptionStatus = { label: string; value: string }[];

export type Task = {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "done";
  dueDate: string;
};

export type ThirdPartyTask = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy: string;
  createdById: string;
  updatedBy: string;
  updatedById: string;
  deletedBy: string;
  deletedById: string;
  active: boolean;
  imageUrl: string;
  platform: "line" | "openai" | (string & {});
  oldAccountName: string;
  name: string;
  status: string;
  originalName: string;
  current: number;
  limit: number;
  refId: string;
  organizationId: string;
  branchId: string;
  isConnected?: boolean;
};
