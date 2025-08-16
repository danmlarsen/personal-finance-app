import { TRecurringBill } from "@/data/getRecurringBills";
import { clsx, type ClassValue } from "clsx";
import { isPast, isSameMonth } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRecurringBillsSummary(
  recurringBills: TRecurringBill[],
  date: string,
) {
  const today = new Date(date);

  const paidBills = recurringBills.filter((transaction) => {
    const transactionDate = new Date(transaction.created_at);
    return isSameMonth(today, transactionDate) && isPast(transactionDate);
  });
  const paidBillsAmount = paidBills.reduce(
    (total, transaction) => Math.abs(Number(transaction.amount)) + total,
    0,
  );

  const totalUpcoming = recurringBills.filter((transaction) => {
    const transactionDate = new Date(transaction.created_at);
    return transactionDate.getDate() > today.getDate();
  });
  const totalUpcomingAmount = totalUpcoming.reduce(
    (total, transaction) => Math.abs(Number(transaction.amount)) + total,
    0,
  );

  const dueSoon = totalUpcoming.filter((transaction) => {
    const transactionDate = new Date(transaction.created_at);
    return transactionDate.getDate() - 5 <= today.getDate();
  });
  const dueSoonAmount = dueSoon.reduce(
    (total, transaction) => Math.abs(Number(transaction.amount)) + total,
    0,
  );

  return [
    {
      title: "Paid Bills",
      amount: paidBills.length,
      totalSum: paidBillsAmount,
    },
    {
      title: "Total Upcoming",
      amount: totalUpcoming.length,
      totalSum: totalUpcomingAmount,
    },
    {
      title: "Due Soon",
      amount: dueSoon.length,
      totalSum: dueSoonAmount,
    },
  ];
}
