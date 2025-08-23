"use server";

import { signupFormSchema } from "@/validation/signupFormSchema";
import z from "zod";
import { hash } from "bcryptjs";
import { db } from "@/db";
import { balanceTable, usersTable } from "@/db/schema";

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

      await tx.insert(balanceTable).values({
        current: "5000",
        income: "3814.25",
        expenses: "1700.5",
        userId: user.id,
      });
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
