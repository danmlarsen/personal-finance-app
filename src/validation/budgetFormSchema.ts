import z from "zod";

export const budgetFormSchema = z.object({
  category: z.coerce.number().positive(),
  maximum: z.coerce.number<string | number>().positive(),
  theme: z.string(),
});
