"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { budgetsTable } from "@/db/schema";
import { budgetFormSchema } from "@/validation/budgetFormSchema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import z from "zod";

export async function createBudget(data: z.infer<typeof budgetFormSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = z.safeParse(budgetFormSchema, data);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occurred.",
    };
  }

  try {
    await db.insert(budgetsTable).values({
      categoryId: data.category,
      userId: Number(session.user.id),
      maximum: data.maximum.toString(),
      theme: data.theme,
    });

    revalidateTag(`budgets-${session.user.id}`);

    return {
      success: true,
    };
  } catch {
    return {
      error: true,
      message: "An error occurred while creating the budget.",
    };
  }
}

export async function editBudget(
  id: number,
  data: z.infer<typeof budgetFormSchema>,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = z.safeParse(budgetFormSchema, data);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occurred.",
    };
  }

  try {
    await db
      .update(budgetsTable)
      .set({
        categoryId: data.category,
        maximum: data.maximum.toString(),
        theme: data.theme,
      })
      .where(
        and(
          eq(budgetsTable.id, id),
          eq(budgetsTable.userId, Number(session.user.id)),
        ),
      );

    revalidateTag(`budgets-${session.user.id}`);

    return {
      success: true,
    };
  } catch {
    return {
      error: true,
      message: "An error occurred while updating the budget.",
    };
  }
}

export async function deleteBudget(id: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  try {
    await db
      .delete(budgetsTable)
      .where(
        and(
          eq(budgetsTable.id, id),
          eq(budgetsTable.userId, Number(session.user.id)),
        ),
      );

    revalidateTag(`budgets-${session.user.id}`);

    return {
      success: true,
    };
  } catch {
    return {
      error: true,
      message: "An error occurred while deleting the budget.",
    };
  }
}
