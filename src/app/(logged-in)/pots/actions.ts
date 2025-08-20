"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { balanceTable, potsTable } from "@/db/schema";
import { potsFormSchema } from "@/validation/potsFormSchema";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

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
      message: validation.error.issues,
    };
  }

  await db.insert(potsTable).values({
    ...data,
    userId: Number(session.user.id),
    target: data.target.toString(),
    total: "0",
  });

  return {
    success: true,
  };
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

  await db
    .update(potsTable)
    .set({
      ...data,
      target: data.target.toString(),
    })
    .where(
      and(eq(potsTable.id, id), eq(potsTable.userId, Number(session.user.id))),
    );

  return {
    success: true,
  };
}

export async function deletePot(id: number) {
  await db.transaction(async (tx) => {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "Unauthorized",
      };
    }
    const [data] = await tx
      .select({ total: potsTable.total })
      .from(potsTable)
      .where(
        and(
          eq(potsTable.id, id),
          eq(potsTable.userId, Number(session.user.id)),
        ),
      );

    if (!data) {
      return {
        error: true,
        message: "Unable to fetch pot data",
      };
    }

    await tx
      .update(balanceTable)
      .set({ current: sql`${balanceTable.current} + ${data.total}` })
      .where(eq(balanceTable.userId, Number(session.user.id)));
    await tx
      .delete(potsTable)
      .where(
        and(
          eq(potsTable.id, id),
          eq(potsTable.userId, Number(session.user.id)),
        ),
      );
  });
}

export async function depositPot(id: number, amount: number) {
  await db.transaction(async (tx) => {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "Unauthorized",
      };
    }

    await tx
      .update(balanceTable)
      .set({ current: sql`${balanceTable.current} - ${amount}` })
      .where(eq(balanceTable.userId, Number(session.user.id)));
    await tx
      .update(potsTable)
      .set({ total: sql`${potsTable.total} + ${amount}` })
      .where(
        and(
          eq(potsTable.id, id),
          eq(potsTable.userId, Number(session.user.id)),
        ),
      );
  });
}

export async function withdrawPot(id: number, amount: number) {
  await db.transaction(async (tx) => {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "Unauthorized",
      };
    }

    await tx
      .update(balanceTable)
      .set({ current: sql`${balanceTable.current} + ${amount}` })
      .where(eq(balanceTable.userId, Number(session.user.id)));
    await tx
      .update(potsTable)
      .set({ total: sql`${potsTable.total} - ${amount}` })
      .where(
        and(
          eq(potsTable.id, id),
          eq(potsTable.userId, Number(session.user.id)),
        ),
      );
  });
}
