import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { and, asc, desc, eq, ilike, sql } from "drizzle-orm";
import "server-only";

export type TRecurringBill = {
  id: number;
  name: string;
  amount: string;
  created_at: string;
  avatar: string;
};

export async function getRecurringBills({
  billTitle,
  sortBy = "latest",
}: { billTitle?: string; sortBy?: string } = {}) {
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

  const filters = [];

  if (billTitle) {
    filters.push(ilike(latest.name, `%${billTitle}%`));
  }

  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  const filteredQuery = whereClause ? baseQuery.where(whereClause) : baseQuery;

  let sortedQuery;
  switch (sortBy) {
    case "oldest":
      sortedQuery = filteredQuery.orderBy(
        desc(sql`EXTRACT(DAY FROM ${latest.created_at})`),
      );
      break;
    case "a-z":
      sortedQuery = filteredQuery.orderBy(asc(latest.name));
      break;
    case "z-a":
      sortedQuery = filteredQuery.orderBy(desc(latest.name));
      break;
    case "highest":
      sortedQuery = filteredQuery.orderBy(asc(latest.amount));
      break;
    case "lowest":
      sortedQuery = filteredQuery.orderBy(desc(latest.amount));
      break;
    default:
      sortedQuery = filteredQuery.orderBy(
        asc(sql`EXTRACT(DAY FROM ${latest.created_at})`),
      );
  }

  return sortedQuery;
}
