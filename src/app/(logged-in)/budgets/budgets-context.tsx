"use client";

import { TBudget } from "@/data/getBudgets";
import { createContext, useContext } from "react";

const BudgetsContext = createContext<TBudget[] | null>(null);

export function useBudgetsContext() {
  return useContext(BudgetsContext)!;
}

export function BudgetsContextProvider({
  value,
  children,
}: {
  value: TBudget[];
  children: React.ReactNode;
}) {
  return (
    <BudgetsContext.Provider value={value}>{children}</BudgetsContext.Provider>
  );
}
