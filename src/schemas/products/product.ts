import { z } from "zod";

export const ProductsFormSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number().optional(),
  brand: z.string().optional(),
  status: z.string().optional(),
  sku: z.string().optional(),
  type: z.string().optional(),
  price: z.coerce.number().optional(),
  imageUrl: z.string().optional(),
  detail: z.string().optional(),
  description: z.string().optional(),
  manufacturedDate: z.date().optional(),
  expireDate: z.date().optional(),
  weight: z.coerce.number().optional(),
  country: z.string().optional(),
  subRegion: z.string().optional(),
  vintage: z.string().optional(),
  colour: z.string().optional(),
  alcohol: z.coerce.number().optional(),
  bottleSize: z.coerce.number().optional(),
  reference: z.string().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
});

export type ProductsFormValues = z.infer<typeof ProductsFormSchema>;
