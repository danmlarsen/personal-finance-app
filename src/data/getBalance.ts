import { db } from "@/db";
import { balanceTable } from "@/db/schema";
import "server-only";

export async function getBalance() {
  const [balance] = await db.select().from(balanceTable);
  return balance;
}
