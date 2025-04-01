import { z } from "zod";

export const loginFormSchema = z.object({
  user: z.string(),
  password: z.string().min(6),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const signinFormSchema = z.object({
  user: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
});

export type SigninFormSchema = z.infer<typeof signinFormSchema>;
