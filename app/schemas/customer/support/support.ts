import { z } from "zod";

export const CustomerSupportFormSchema = z.object({
  isMain: z.boolean(),
  userId: z.string(),
  customerId: z.string(),
});

export type CustomerSupportFormValues = z.infer<
  typeof CustomerSupportFormSchema
>;

export const SupportCustomerFormSchema = z.object({
  id: z.string(),
  isMain: z.boolean(),
  userId: z.string(),
  customerId: z.string(),
  fullName: z.string(),
  photoUrl: z.string(),
});

export type SupportCustomerFormValues = z.infer<
  typeof SupportCustomerFormSchema
>;
