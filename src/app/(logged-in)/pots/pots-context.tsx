"use client";

import { potsTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { createContext, useContext } from "react";

type TPots = InferSelectModel<typeof potsTable>;

const PotsContext = createContext<TPots[] | null>(null);

export function usePotsContext() {
  return useContext(PotsContext)!;
}

export function PotsContextProvider({
  value,
  children,
}: {
  value: TPots[];
  children: React.ReactNode;
}) {
  return <PotsContext.Provider value={value}>{children}</PotsContext.Provider>;
}
