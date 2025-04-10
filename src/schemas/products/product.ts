import { z } from "zod";

export const ProductsFormSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  brand: z.string(),
  status: z.string(),
  sku: z.string(),
  type: z.string(),
  price: z.coerce.number(),
  imageUrl: z.string(),
  detail: z.string(),
  description: z.string(),
  manufacturedDate: z.string(),
  expireDate: z.string(),
  weight: z.coerce.number(),
  country: z.string(),
  subRegion: z.string(),
  vintage: z.string(),
  colour: z.string(),
  alcohol: z.coerce.number(),
  bottleSize: z.coerce.number(),
  reference: z.string(),
  width: z.coerce.number(),
  height: z.coerce.number(),
});

export type ProductsFormValues = z.infer<typeof ProductsFormSchema>;
