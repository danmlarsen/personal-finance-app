import "server-only";
import { db } from "@/db";
import { potsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export async function getPots(userId: number) {
  const pots = await db
    .select()
    .from(potsTable)
    .orderBy(potsTable.id)
    .where(eq(potsTable.userId, userId));
  return pots;
}

export function getCachedPots(userId: number) {
  return unstable_cache(
    async () => {
      return getPots(userId);
    },
    ["pots", userId.toString()],
    { tags: [`pots-${userId}`], revalidate: 3600 },
  )();
}
