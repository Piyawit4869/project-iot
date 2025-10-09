import { z } from "zod";

export const PasswordFormSchema = z.object({
  password: z.string().default(""),
  newPassword: z.string().default(""),
});

export type PasswordFormValues = z.infer<typeof PasswordFormSchema>;
