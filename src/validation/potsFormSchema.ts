import { z } from "zod";

export const potsFormSchema = z.object({
  name: z
    .string()
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters"),
  target: z.coerce.number().positive("Please enter a positive number"),
  theme: z.string(),
});
