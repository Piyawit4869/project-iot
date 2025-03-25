import { z } from "zod";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
