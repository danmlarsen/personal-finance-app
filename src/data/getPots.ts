import "server-only";
import { db } from "@/db";
import { potsTable } from "@/db/schema";

export async function getPots() {
  const pots = await db.select().from(potsTable);

  return pots.map((pot) => ({
    ...pot,
    target: Number(pot.target),
    total: Number(pot.total),
  }));
}
