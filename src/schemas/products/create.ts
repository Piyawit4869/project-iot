import { z } from "zod";

export const CreateFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.coerce.number(),
  unitPrice: z.coerce.number(),
  discount: z.coerce.number(),
  total: z.coerce.number(),
});

export type CreateFormValues = z.infer<typeof CreateFormSchema>;
