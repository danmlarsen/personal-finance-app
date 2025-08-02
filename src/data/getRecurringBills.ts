import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import "server-only";

export type TRecurringBill = {
  name: string;
  amount: string;
  created_at: string;
  avatar: string;
};

export async function getRecurringBills() {
  const { rows } = await db.execute<TRecurringBill>(sql`
      SELECT DISTINCT ON (${transactionsTable.name})
        ${transactionsTable.name},
        ${transactionsTable.amount},
        ${transactionsTable.createdAt},
        ${transactionsTable.avatar}
      FROM ${transactionsTable}
      WHERE ${transactionsTable.recurring} = TRUE 
      ORDER BY ${transactionsTable.name}
    `);

  return rows;
}
