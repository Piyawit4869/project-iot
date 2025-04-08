import { z } from "zod";

export const CreateFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.string(),
  price: z.string(),
  discount: z.string(),
  total: z.string(),
  accessToken: z.string(),
});

export type CreateFormValues = z.infer<typeof CreateFormSchema>;
