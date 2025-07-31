import { balance, transactions, pots, budgets } from "@/data/data.json";

export type TBalance = typeof balance;
export type TTransaction = (typeof transactions)[0];
export type TPots = (typeof pots)[0];
export type TBudgets = (typeof budgets)[0];
