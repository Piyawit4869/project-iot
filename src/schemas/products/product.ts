import { z } from "zod";

export const ProductsFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.coerce.number(),
  unitPrice: z.coerce.number(),
  discount: z.coerce.number(),
  total: z.coerce.number(),
});

export type ProductsFormValues = z.infer<typeof ProductsFormSchema>;
