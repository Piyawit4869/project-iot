import { z } from "zod";

export const ProductsFormSchema = z.object({
  name: z.string().default(""),
  quantity: z.coerce.number().optional().default(0),
  brand: z.string().optional().default(""),
  sku: z.string().optional().default(""),
  type: z.string().optional().default(""),
  price: z.coerce.number().optional().default(0),
  imageUrl: z.string().optional().default(""),
  detail: z.string().optional().default(""),
  description: z.string().optional().default(""),
  manufacturedDate: z.date().optional(),
  expireDate: z.date().optional(),
  weight: z.coerce.number().optional().default(0),
  country: z.string().optional().default(""),
  subRegion: z.string().optional().default(""),
  vintage: z.string().optional().default(""),
  colour: z.string().optional().default(""),
  alcohol: z.coerce.number().optional().default(0),
  bottleSize: z.coerce.number().optional().default(0),
  reference: z.string().optional().default(""),
  width: z.coerce.number().optional().default(0),
  height: z.coerce.number().optional().default(0),
});

export type ProductsFormValues = z.infer<typeof ProductsFormSchema>;
