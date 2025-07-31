import { type TTransaction } from "@/app/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uniqueTransactionByName(arr: TTransaction[]) {
  const seen = new Set<string>();
  return arr.filter((transaction) => {
    if (seen.has(transaction.name)) return false;
    seen.add(transaction.name);
    return true;
  });
}
