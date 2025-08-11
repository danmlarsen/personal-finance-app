"use server";

import { signupFormSchema } from "@/validation/signupFormSchema";
import z from "zod";
import { hash } from "bcryptjs";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

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

    const [user] = await db
      .insert(usersTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      })
      .returning();

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  } catch (e: any) {
    if (e?.cause?.code === "23505") {
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
