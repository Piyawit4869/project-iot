import { z } from "zod";

export const UsersFormSchema = z.object({
  email: z.string().email().default(""),
  userName: z.string().default(""),
  password: z.string().default(""),
  status: z.string().default(""),
  active: z.boolean(),
  roleId: z.string().default(""),
  employeeRoleId: z.string().default(""),
  profile: z.object({
    prefix: z.string().default(""),
    firstName: z.string().default(""),
    lastName: z.string().default(""),
    firstNameTh: z.string().default(""),
    lastNameTh: z.string().default(""),
    birthDate: z.date(),
    photoUrl: z.string().default(""),
    phone: z.string().default(""),
  }),
});

export type UsersFormValues = z.infer<typeof UsersFormSchema>;
