import z from "zod";
import { passwordMatchSchema } from "./passwordSchema";

export const signupFormSchema = z
  .object({
    name: z.string().min(2, "Name must contain at least 2 characters"),
    email: z.email(),
  })
  .and(passwordMatchSchema);
