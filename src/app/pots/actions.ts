"use server";

import { db } from "@/db";
import { balanceTable, potsTable } from "@/db/schema";
import { potFormSchema } from "@/validation/potFormSchema";
import { eq, InferInsertModel, sql } from "drizzle-orm";
import z from "zod";

export async function createPot(
  data: Omit<InferInsertModel<typeof potsTable>, "total">,
) {
  const validation = z.safeParse(potFormSchema, data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occured",
    };
  }

  await db.insert(potsTable).values({
    ...data,
    total: "0",
  });
}

export async function editPot(
  id: number,
  data: Omit<InferInsertModel<typeof potsTable>, "total">,
) {
  const validation = z.safeParse(potFormSchema, data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occured",
    };
  }

  await db
    .update(potsTable)
    .set({
      ...data,
    })
    .where(eq(potsTable.id, id));
}

export async function deletePot(id: number) {
  await db.transaction(async (tx) => {
    const [data] = await tx
      .select({ total: potsTable.total })
      .from(potsTable)
      .where(eq(potsTable.id, id));

    if (!data) {
      return {
        error: true,
        message: "Unable to fetch pot data",
      };
    }

    await tx
      .update(balanceTable)
      .set({ current: sql`${balanceTable.current} + ${data.total}` });
    await tx.delete(potsTable).where(eq(potsTable.id, id));
  });
}

export async function depositPot(id: number, amount: number) {
  await db.transaction(async (tx) => {
    await tx
      .update(balanceTable)
      .set({ current: sql`${balanceTable.current} - ${amount}` });
    await tx
      .update(potsTable)
      .set({ total: sql`${potsTable.total} + ${amount}` })
      .where(eq(potsTable.id, id));
  });
}

export async function withdrawPot(id: number, amount: number) {
  await db.transaction(async (tx) => {
    await tx
      .update(balanceTable)
      .set({ current: sql`${balanceTable.current} + ${amount}` });
    await tx
      .update(potsTable)
      .set({ total: sql`${potsTable.total} - ${amount}` })
      .where(eq(potsTable.id, id));
  });
}
