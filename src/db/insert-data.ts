import dotenv from "dotenv";
import data from "./data.json";
import {
  balanceTable,
  budgetsTable,
  categoriesTable,
  potsTable,
  transactionsTable,
} from "./schema";
import { drizzle } from "drizzle-orm/neon-http";

dotenv.config({
  path: ".env.local",
});

const db = drizzle(process.env.DATABASE_URL!);

function getUniqueTransactionCategories() {
  return Array.from(new Set(data.transactions.map((t) => t.category)));
}

async function insertCategories() {
  const categoriesData = getUniqueTransactionCategories().map((t) => ({
    name: t,
  }));

  await db.insert(categoriesTable).values(categoriesData).onConflictDoNothing();
}

async function getCategories() {
  return db.select().from(categoriesTable);
}

export async function insertBalance(userId: number) {
  await db.insert(balanceTable).values([
    {
      userId: userId,
      current: data.balance.current.toString(),
      income: data.balance.income.toString(),
      expenses: data.balance.expenses.toString(),
    },
  ]);
}

async function insertTransactions(categories: { id: number; name: string }[]) {
  const transactionsData = data.transactions.map((transaction) => {
    const categoryId = categories.find(
      (c) => c.name === transaction.category,
    )!.id;

    return {
      name: transaction.name,
      categoryId: categoryId!,
      amount: transaction.amount.toString(),
      createdAt: transaction.date,
      avatar: transaction.avatar,
      recurring: transaction.recurring,
    };
  });

  await db.insert(transactionsTable).values(transactionsData);
}

async function insertBudgets(
  categories: { id: number; name: string }[],
  userId: number,
) {
  const budgetsData = data.budgets.map((budget) => {
    const categoryId = categories.find((c) => c.name === budget.category)!.id;

    return {
      categoryId,
      userId,
      maximum: budget.maximum.toString(),
      theme: budget.theme,
    };
  });

  await db.insert(budgetsTable).values(budgetsData);
}

async function insertPots(userId: number) {
  const potsData = data.pots.map((pot) => ({
    name: pot.name,
    target: pot.target.toString(),
    total: pot.total.toString(),
    theme: pot.theme,
    userId,
  }));

  await db.insert(potsTable).values(potsData);
}

async function main() {
  await insertBalance(1);
  // await insertCategories();
  const categories = await getCategories();
  // await insertTransactions(categories);
  await insertBudgets(categories, 1);
  await insertPots(1);
}

main();
