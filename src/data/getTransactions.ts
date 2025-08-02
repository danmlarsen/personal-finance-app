import { db } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getTransactions() {
  const transactions = await db
    .select({
      id: transactionsTable.id,
      name: transactionsTable.name,
      amount: transactionsTable.amount,
      category: categoriesTable.name,
      date: transactionsTable.createdAt,
      avatar: transactionsTable.avatar,
    })
    .from(transactionsTable)
    .innerJoin(
      categoriesTable,
      eq(transactionsTable.categoryId, categoriesTable.id),
    )
    .orderBy(desc(transactionsTable.createdAt), transactionsTable.name);

  return transactions.map((t) => ({
    ...t,
    amount: Number(t.amount),
  }));
}
