"use server";

import { db } from "@/db";
import { budgetsTable } from "@/db/schema";
import { budgetFormSchema } from "@/validation/budgetFormSchema";
import { eq } from "drizzle-orm";
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

export async function deleteBudget(id: number) {
  await db.delete(budgetsTable).where(eq(budgetsTable.id, id));
}
