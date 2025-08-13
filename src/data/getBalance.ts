import { db } from "@/db";
import { balanceTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";

export async function getBalance(userId: number) {
  const [balance] = await db
    .select()
    .from(balanceTable)
    .where(eq(balanceTable.userId, userId));
  return balance;
}
