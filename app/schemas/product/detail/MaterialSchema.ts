import { z } from "zod";

// Enums (optional - safer for fixed values)
const MatTypeEnum = z.enum(["material", "non_material"]);
const StatusEnum = z.enum(["available", "unavailable"]);

export const MaterialSchema = z.object({
  id: z.string(),
  name: z.string(),
  // quantity: z.number().min(0),
  quantity: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(0)),
  sku: z.string(),
  matType: MatTypeEnum,
  status: StatusEnum,
  // price: z.number().min(0),
  price: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(0)),
  // discountPrice: z.number().min(0),
  discountPrice: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(0)),
  // vatPrice: z.number().min(0),
  vatPrice: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(0)),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  refCode: z.string().optional(),
  custom: z.boolean(),
  active: z.boolean(),
  productId: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const MaterialCreateSchema = MaterialSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const MaterialUpdateSchema = MaterialSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const MaterialListSchema = z.array(MaterialSchema);

// Types
export type Material = z.infer<typeof MaterialSchema>;
export type MaterialCreateDTO = z.infer<typeof MaterialCreateSchema>;
export type MaterialUpdateDTO = z.infer<typeof MaterialUpdateSchema>;
export type MaterialList = z.infer<typeof MaterialListSchema>;
