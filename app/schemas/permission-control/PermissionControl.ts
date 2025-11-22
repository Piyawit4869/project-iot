import { z } from "zod";

const SelectedUser = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  mainRoleId: z.string().optional(),
  position: z.string().default(""),
  traits: z.array(z.string()).default([]),
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  gender: z.string().default(""),
  phone: z.string().default(""),
  startDate: z.string().default(""),
  address: z.string().default(""),
  photoUrl: z.string().default(""),
});

export const PermissionControlFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "กรุณากรอกชื่อตำแหน่ง"),
  firstName: z.string(),
  lastName: z.string().default(""),
  description: z.string().default(""),
  photoUrl: z.string().default(""),
  status: z.string(),
  active: z.boolean().default(true),
  mainSupportId: z.string().optional(),
  mainRoleId: z.string().optional(),
  SelectedUsers: z.array(SelectedUser),
});

export type PermissionControlValues = z.infer<
  typeof PermissionControlFormSchema
>;

const PermissionSchema = z.object({
  coreFeatureId: z.string(),
  effect: z.enum(["allow", "deny"]),
  actions: z.array(
    z.enum([
      "view",
      "create",
      "update",
      "cancel",
      "delete",
      "approved",
      "rejected",
      "export",
      "manage",
    ])
  ),
});

export const PermissionControlSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  active: z.boolean(),
  scope: z.string(),
  subjectId: z.string(),
  mode: z.enum(["replace", "add", "remove"]),
  enabled: z.boolean(),
  note: z.string().optional(),
  permissions: z.array(PermissionSchema),
});

export type PermissionValuesData = z.infer<typeof PermissionControlSchema>;

export const PermissionFormSchema = z.object({
  id: z.string().optional(),
  description: z.string().default(""),
  status: z.string(),
  active: z.boolean().default(true),
  mainRoleId: z.string().optional(),
});

export type PermissionValues = z.infer<typeof PermissionFormSchema>;
