import z from "zod";

export const potsTransactionFormSchema = z.object({
  amount: z.coerce
    .number<string | number>()
    .positive("Please enter a positive number")
    .max(10000, "Maximum transaction amount is $10,000"),
});
