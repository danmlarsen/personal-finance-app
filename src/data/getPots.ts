import "server-only";
import { db } from "@/db";
import { potsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPots(userId: number) {
  const pots = await db
    .select()
    .from(potsTable)
    .orderBy(potsTable.id)
    .where(eq(potsTable.userId, userId));
  return pots;
}
