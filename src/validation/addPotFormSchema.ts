import z from "zod";

export const addPotFormSchema = z.object({
  potName: z.string().max(30),
  target: z.coerce.number().min(10).max(100000),
  theme: z.string(),
});
