import { z } from "zod";

export const UsersFormSchema = z.object({
  email: z.string().email().default(""),
  userName: z.string().default(""),
  password: z.string().min(6).default(""),
  status: z.string().default(""),
  roleId: z.string().default(""),
  employeeRoleId: z.string().default(""),
  profile: z.object({
    prefix: z.string().default(""),
    firstName: z.string().default(""),
    lastName: z.string().default(""),
    firstNameTh: z.string().default(""),
    lastNameTh: z.string().default(""),
    birthDate: z.coerce.date().optional(),
    phone: z.string().default(""),
  }),
});

export type super_UsersFormValues = z.infer<typeof UsersFormSchema>;
