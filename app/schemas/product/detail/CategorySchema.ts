import { z } from "zod";

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  active: z.boolean().default(true),
});

const CategoryCreateSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
  active: z.boolean().default(true),
});

export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;
export type Category = z.infer<typeof CategorySchema>;

const CategoryListSchema = z.array(CategorySchema);

export type CategoryList = Category[];

export { CategoryListSchema, CategorySchema, CategoryCreateSchema };
