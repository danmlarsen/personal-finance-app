"use server";

import { signupFormSchema } from "@/validation/signupFormSchema";
import z from "zod";
import { hash } from "bcryptjs";
import { db } from "@/db";
import { balanceTable, budgetsTable, potsTable, usersTable } from "@/db/schema";

const PLACEHOLDER_BUDGETS = [
  {
    categoryId: 7,
    maximum: "50.0",
    theme: "#277C78",
  },
  {
    categoryId: 12,
    maximum: "750.0",
    theme: "#82C9D7",
  },
  {
    categoryId: 5,
    maximum: "75.0",
    theme: "#F2CDAC",
  },
  {
    categoryId: 10,
    maximum: "100.0",
    theme: "#626070",
  },
];

const PLACEHOLDER_POTS = [
  {
    name: "Savings",
    target: "2000.0",
    total: "159.0",
    theme: "#277C78",
  },
  {
    name: "Concert Ticket",
    target: "150.0",
    total: "110.0",
    theme: "#626070",
  },
  {
    name: "Gift",
    target: "150.0",
    total: "110.0",
    theme: "#82C9D7",
  },
  {
    name: "New Laptop",
    target: "1000.0",
    total: "10.0",
    theme: "#F2CDAC",
  },
  {
    name: "Holiday",
    target: "1440.0",
    total: "531.0",
    theme: "#826CB0",
  },
];

export async function registerUser({
  data,
}: {
  data: z.infer<typeof signupFormSchema>;
}) {
  const newUserValidation = signupFormSchema.safeParse(data);

  if (!newUserValidation.success) {
    return {
      error: true,
      message:
        newUserValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  try {
    const hashedPassword = await hash(data.password, 12);

    await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(usersTable)
        .values({
          name: data.name,
          email: data.email,
          password: hashedPassword,
        })
        .returning();

      await Promise.all([
        tx.insert(balanceTable).values({
          current: "5000",
          income: "3814.25",
          expenses: "1700.5",
          userId: user.id,
        }),

        //
        // Create placeholder budgets and pots for new user
        //
        tx.insert(budgetsTable).values(
          PLACEHOLDER_BUDGETS.map((budget) => ({
            ...budget,
            userId: user.id,
          })),
        ),

        tx.insert(potsTable).values(
          PLACEHOLDER_POTS.map((pot) => ({
            ...pot,
            userId: user.id,
          })),
        ),
      ]);
    });

    return {
      success: true,
    };
  } catch (e: unknown) {
    const err = e as { cause?: { code?: string } };
    if (err?.cause?.code === "23505") {
      return {
        error: true,
        message: "An account is already registered with that email address.",
      };
    }

    return {
      error: true,
      message: "An error occurred",
    };
  }
}
