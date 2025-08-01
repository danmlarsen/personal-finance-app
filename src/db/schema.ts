import {
  boolean,
  date,
  integer,
  numeric,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

export const balanceTable = pgTable("balance", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  current: numeric().default("0").notNull(),
  income: numeric().default("0").notNull(),
  expenses: numeric().default("0").notNull(),
});

export const categoriesTable = pgTable("category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  categoryId: integer("category_id")
    .references(() => categoriesTable.id)
    .notNull(),
  amount: numeric().notNull(),
  createdAt: date("created_at").defaultNow().notNull(),
  avatar: varchar({ length: 255 }).notNull(),
  recurring: boolean().notNull(),
});

export const budgetsTable = pgTable("budgets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  categoryId: integer("category_id")
    .references(() => categoriesTable.id)
    .notNull(),
  maximum: numeric().default("0").notNull(),
  theme: varchar({ length: 10 }).notNull(),
});

export const potsTable = pgTable("pots", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  target: numeric().notNull(),
  total: numeric().notNull(),
  theme: varchar({ length: 10 }).notNull(),
});
