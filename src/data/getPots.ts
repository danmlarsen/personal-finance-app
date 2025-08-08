import "server-only";
import { db } from "@/db";
import { potsTable } from "@/db/schema";

export async function getPots() {
  const pots = await db.select().from(potsTable);
  return pots;
}
