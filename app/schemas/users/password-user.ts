import { z } from "zod";

export const PasswordFormSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export type PasswordFormValues = z.infer<typeof PasswordFormSchema>;
