import { z } from "zod";

export const RolesFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "กรุณาระบุชื่อตำแหน่ง"),
  description: z.string().min(1, "กรุณาระบุรายละเอียดตำแหน่ง"),
  organizationId: z.string(),
});

export type RolesFormValues = z.infer<typeof RolesFormSchema>;
