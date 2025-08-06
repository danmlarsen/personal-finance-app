"use server";

import { db } from "@/db";
import { potsTable } from "@/db/schema";
import { addPotFormSchema } from "@/validation/addPotFormSchema";
import { InferInsertModel } from "drizzle-orm";
import z from "zod";

export async function createPot({
  data,
}: {
  data: Omit<InferInsertModel<typeof potsTable>, "total">;
}) {
  const validation = z.safeParse(addPotFormSchema, data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occured",
    };
  }

  db.insert(potsTable).values({
    ...data,
    total: "0",
  });
}
