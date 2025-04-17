import { z } from "zod";

export const RoleFormSchema = z.object({
  name: z.string().default(""),
  description: z.string().default(""),
  status: z.string().default(""),
});

export type RoleFormValues = z.infer<typeof RoleFormSchema>;
