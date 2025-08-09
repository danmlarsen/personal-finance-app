import z from "zod";

export const budgetFormSchema = z.object({
  category: z.string(),
  maximum: z.coerce.number().positive(),
  theme: z.string(),
});
