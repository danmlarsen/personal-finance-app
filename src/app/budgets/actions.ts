"use server";

import { db } from "@/db";
import { budgetsTable } from "@/db/schema";
import { budgetFormSchema } from "@/validation/budgetFormSchema";
import z from "zod";

export async function createBudget(data: z.infer<typeof budgetFormSchema>) {
  const validation = z.safeParse(budgetFormSchema, data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues,
    };
  }

  await db.insert(budgetsTable).values({
    categoryId: data.category,
    maximum: data.maximum.toString(),
    theme: data.theme,
  });

  return {
    success: true,
  };
}
