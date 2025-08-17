import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import "server-only";

export type TRecurringBill = {
  id: number;
  name: string;
  amount: string;
  created_at: string;
  avatar: string;
};

export async function getRecurringBills({
  sortBy = "latest",
}: { sortBy?: string } = {}) {
  const latestPerName = db
    .selectDistinctOn([transactionsTable.name], {
      id: transactionsTable.id,
      name: transactionsTable.name,
      amount: transactionsTable.amount,
      created_at: transactionsTable.createdAt,
      avatar: transactionsTable.avatar,
    })
    .from(transactionsTable)
    .where(eq(transactionsTable.recurring, true))
    .orderBy(transactionsTable.name, desc(transactionsTable.createdAt));

  const latest = latestPerName.as("latest");

  const baseQuery = db
    .select({
      id: latest.id,
      name: latest.name,
      amount: latest.amount,
      created_at: latest.created_at,
      avatar: latest.avatar,
    })
    .from(latest);

  let sortedQuery;
  switch (sortBy) {
    case "oldest":
      sortedQuery = baseQuery.orderBy(
        desc(sql`EXTRACT(DAY FROM ${latest.created_at})`),
      );
      break;
    case "a-z":
      sortedQuery = baseQuery.orderBy(asc(latest.name));
      break;
    case "z-a":
      sortedQuery = baseQuery.orderBy(desc(latest.name));
      break;
    case "highest":
      sortedQuery = baseQuery.orderBy(asc(latest.amount));
      break;
    case "lowest":
      sortedQuery = baseQuery.orderBy(desc(latest.amount));
      break;
    default:
      sortedQuery = baseQuery.orderBy(
        asc(sql`EXTRACT(DAY FROM ${latest.created_at})`),
      );
  }

  return sortedQuery;
}
