import { db } from "@/db";
import { budgetsTable, categoriesTable, transactionsTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import "server-only";

export type TRecentTransaction = {
  id: number;
  name: string;
  amount: string;
  created_at: string;
  avatar: string;
};

export type TBudget = {
  id: number;
  category_id: number;
  user_id: number;
  maximum: string;
  theme: string;
  name: string;
  totalSpent: string;
  recentTransactions: TRecentTransaction[] | null;
};

const CURRENT_MONTH = "2024-08-01";

export async function getBudgets(userId: number) {
  const budgets = await db.execute<TBudget>(sql`
  SELECT 
    b.id,
    b.category_id,
    b.maximum,
    b.theme,
    c.name,
    COALESCE(SUM(t.amount), 0) AS "totalSpent",
    (
      SELECT json_agg(tt ORDER BY tt."created_at" DESC)
      FROM (
        SELECT t2.id, t2.name, t2.amount, t2.avatar, t2."created_at"
        FROM ${transactionsTable} t2
        WHERE t2."category_id" = c.id
        ORDER BY t2."created_at" DESC
        LIMIT 3
      ) tt
    ) AS "recentTransactions"
  FROM ${budgetsTable} b
  INNER JOIN ${categoriesTable} c ON b."category_id" = c.id
  LEFT JOIN ${transactionsTable} t ON t."category_id" = c.id AND t."created_at" >= ${CURRENT_MONTH}
  WHERE b."user_id" = ${userId}
  GROUP BY b.id, c.id
`);

  return budgets.rows;
}

export function getCachedBudgets(userId: number) {
  return unstable_cache(
    async () => {
      return getBudgets(userId);
    },
    [userId.toString()],
    { tags: [`budgets-${userId}`], revalidate: 3600 },
  )();
}
