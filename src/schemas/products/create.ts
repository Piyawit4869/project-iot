import { z } from "zod";

export const CreateFormSchema = z.object({
  user: z.string(),
  password: z.string().min(6),
});

export type CreateFormValues = z.infer<typeof CreateFormSchema>;

// export const signinFormSchema = z.object({
//   user: z.string(),
//   password: z.string().min(6),
//   email: z.string().email(),
// });

// export type SigninFormSchema = z.infer<typeof signinFormSchema>;
