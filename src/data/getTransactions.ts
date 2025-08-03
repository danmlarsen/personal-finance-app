import "server-only";
import { db } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { and, asc, desc, eq, ilike, sql } from "drizzle-orm";

export type TGetTransactionParams = {
  transactionName?: string;
  sortBy?: string;
  category?: string;
  page?: number;
  pageSize?: number;
};

export async function getTransactions({
  transactionName,
  sortBy = "latest",
  category = "all",
  page = 1,
  pageSize = 10,
}: TGetTransactionParams = {}) {
  const baseQuery = db
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
    );

  const filters = [];
  if (category !== "all") {
    filters.push(ilike(categoriesTable.name, `%${category}%`));
  }
  if (transactionName) {
    filters.push(ilike(transactionsTable.name, `%${transactionName}%`));
  }

  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  const countQuery = db
    .select({ count: sql<number>`COUNT(*)` })
    .from(transactionsTable)
    .innerJoin(
      categoriesTable,
      eq(transactionsTable.categoryId, categoriesTable.id),
    )
    .where(whereClause);

  const filteredQuery = whereClause ? baseQuery.where(whereClause) : baseQuery;

  let sortedQuery;
  switch (sortBy) {
    case "oldest":
      sortedQuery = filteredQuery.orderBy(asc(transactionsTable.createdAt));
      break;
    case "a-z":
      sortedQuery = filteredQuery.orderBy(asc(transactionsTable.name));
      break;
    case "z-a":
      sortedQuery = filteredQuery.orderBy(desc(transactionsTable.name));
      break;
    case "highest":
      sortedQuery = filteredQuery.orderBy(desc(transactionsTable.amount));
      break;
    case "lowest":
      sortedQuery = filteredQuery.orderBy(asc(transactionsTable.amount));
      break;
    default:
      sortedQuery = filteredQuery.orderBy(desc(transactionsTable.createdAt));
  }

  const offset = (page - 1) * pageSize;

  const paginatedQuery = sortedQuery.limit(pageSize).offset(offset);

  const [countResult, transactions] = await Promise.all([
    countQuery,
    paginatedQuery,
  ]);

  const totalNumTransactions = Number(countResult[0]?.count ?? 0);

  return {
    totalNumTransactions,
    transactions: transactions.map((t) => ({
      ...t,
      amount: Number(t.amount),
    })),
  };
}
