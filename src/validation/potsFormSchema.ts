import { z } from "zod";

export const potsFormSchema = z.object({
  name: z.string().max(30, "Maximum 30 characters"),
  target: z.coerce.number().positive("Only positive numbers"),
  theme: z.string("Something"),
});
