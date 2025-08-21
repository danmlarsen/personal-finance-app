import z from "zod";

export const budgetFormSchema = z.object({
  category: z.coerce.number().positive(),
  maximum: z.coerce
    .number<string | number>()
    .positive("Please enter a positive number")
    .max(10000, "Maximum must be less then or equal $10,000"),
  theme: z.string(),
});
