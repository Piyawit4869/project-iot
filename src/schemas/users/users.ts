import { z } from "zod";

export const UsersFormSchema = z.object({
  email: z.string().email(),
  userName: z.string(),
  password: z.string(),
  status: z.string(),
  roleId: z.string(),
  employeeRoleId: z.string(),
  profile: z.object({
    prefix: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    firstNameTh: z.string(),
    lastNameTh: z.string(),
    birthDate: z.string(),
    phone: z.string(),
  }),
});

export type UsersFormValues = z.infer<typeof UsersFormSchema>;
