"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { balanceTable, potsTable } from "@/db/schema";
import { potsFormSchema } from "@/validation/potsFormSchema";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { potsTransactionFormSchema } from "@/validation/potsTransactionFormSchema";

export async function createPot(data: z.infer<typeof potsFormSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = z.safeParse(potsFormSchema, data);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occurred",
    };
  }

  try {
    await db.insert(potsTable).values({
      ...data,
      userId: Number(session.user.id),
      target: data.target.toString(),
      total: "0",
    });

    revalidateTag(`pots-${session.user.id}`);

    return {
      success: true,
    };
  } catch (e: unknown) {
    const err = e as { cause?: { code?: string } };
    if (err.cause?.code === "23505") {
      return {
        error: true,
        message: "A pot with that name already exists",
      };
    }

    return {
      error: true,
      message: "An error occurred",
    };
  }
}

export async function editPot(
  id: number,
  data: z.infer<typeof potsFormSchema>,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = z.safeParse(potsFormSchema, data);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occured",
    };
  }

  try {
    await db
      .update(potsTable)
      .set({
        ...data,
        target: data.target.toString(),
      })
      .where(
        and(
          eq(potsTable.id, id),
          eq(potsTable.userId, Number(session.user.id)),
        ),
      );

    revalidateTag(`pots-${session.user.id}`);

    return {
      success: true,
    };
  } catch (e: unknown) {
    const err = e as { cause?: { code?: string } };
    if (err.cause?.code === "23505") {
      return {
        error: true,
        message: "A pot with that name already exists",
      };
    }

    return {
      error: true,
      message: "An error occurred",
    };
  }
}

export async function deletePot(id: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }
  const userId = Number(session.user?.id);

  try {
    await db.transaction(async (tx) => {
      const [data] = await tx
        .select({ total: potsTable.total })
        .from(potsTable)
        .where(and(eq(potsTable.id, id), eq(potsTable.userId, userId)));

      if (!data) {
        return {
          error: true,
          message: "Unable to fetch pot data",
        };
      }

      await tx
        .update(balanceTable)
        .set({ current: sql`${balanceTable.current} + ${data.total}` })
        .where(eq(balanceTable.userId, userId));
      await tx
        .delete(potsTable)
        .where(and(eq(potsTable.id, id), eq(potsTable.userId, userId)));
    });

    revalidateTag(`pots-${session.user.id}`);

    return {
      success: true,
    };
  } catch {
    return {
      error: true,
      message: "An error occurred",
    };
  }
}

export async function depositPot(id: number, amount: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }
  const userId = Number(session.user?.id);

  const validation = z.safeParse(potsTransactionFormSchema, { amount });
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occurred",
    };
  }

  try {
    const [row] = await db
      .select({ current: balanceTable.current })
      .from(balanceTable)
      .where(eq(balanceTable.userId, userId));
    const currentBalance = Number(row.current);
    if (currentBalance < amount) {
      return {
        error: true,
        message: "Insufficient balance to deposit this amount",
      };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(balanceTable)
        .set({ current: sql`${balanceTable.current} - ${amount}` })
        .where(eq(balanceTable.userId, userId));
      await tx
        .update(potsTable)
        .set({ total: sql`${potsTable.total} + ${amount}` })
        .where(and(eq(potsTable.id, id), eq(potsTable.userId, userId)));
    });

    revalidateTag(`pots-${session.user.id}`);

    return {
      success: true,
    };
  } catch {
    return {
      error: true,
      message: "An error occurred",
    };
  }
}

export async function withdrawPot(id: number, amount: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }
  const userId = Number(session.user?.id);

  const validation = z.safeParse(potsTransactionFormSchema, { amount });
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occurred",
    };
  }

  try {
    const [row] = await db
      .select({ total: potsTable.total })
      .from(potsTable)
      .where(and(eq(potsTable.id, id), eq(potsTable.userId, userId)));
    const total = Number(row.total);
    if (total < amount) {
      return {
        error: true,
        message:
          "Insufficient funds in this pot to withdraw the requested amount",
      };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(balanceTable)
        .set({ current: sql`${balanceTable.current} + ${amount}` })
        .where(eq(balanceTable.userId, userId));
      await tx
        .update(potsTable)
        .set({ total: sql`${potsTable.total} - ${amount}` })
        .where(and(eq(potsTable.id, id), eq(potsTable.userId, userId)));
    });

    revalidateTag(`pots-${session.user.id}`);

    return {
      success: true,
    };
  } catch {
    return {
      error: true,
      message: "An error occurred",
    };
  }
}
