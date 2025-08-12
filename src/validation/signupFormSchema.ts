import z from "zod";
import { passwordMatchSchema } from "./passwordSchema";

export const signupFormSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(1, "Name is required")
      .min(2, "Name must contain at least 2 characters"),
    email: z.email("Invalid email").min(1, "Email is required"),
  })
  .and(passwordMatchSchema);
