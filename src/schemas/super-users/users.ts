import { z } from "zod";

export const UsersFormSchema = z.object({
  email: z.string().email().default(""),
  userName: z.string().default(""),
  password: z.string().default("").optional(),
  status: z.string().default("").optional(),
  active: z.boolean().optional(),
  roleId: z.string().default(""),
  employeeRoleId: z.string().default(""),
  profile: z.object({
    prefix: z.string().default("").optional(),
    firstName: z.string().default(""),
    lastName: z.string().default(""),
    firstNameTh: z.string().default("").optional(),
    lastNameTh: z.string().default("").optional(),
    birthDate: z.date().optional(),
    photoUrl: z.string().default(""),
    phone: z.string().default("").optional(),
  }),
});

export type super_UsersFormValues = z.infer<typeof UsersFormSchema>;
