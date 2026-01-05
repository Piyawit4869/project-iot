import { z } from "zod";

export const RolesFormSchema = z.object({
  name: z.string().min(1, "กรุณาระบุชื่อตำแหน่ง"),
  description: z.string().min(1, "กรุณาระบุรายละเอียดตำแหน่ง"),
});

export type RolesFormValues = z.infer<typeof RolesFormSchema>;
