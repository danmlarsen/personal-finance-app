"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { transactions } from "@/data/data.json";
import { useMediaQuery } from "@/hooks/use-media-query";
import { format } from "date-fns";

export default function RecurringBillsList() {
  const recurringBills = transactions.filter(
    (transaction) => !!transaction.recurring,
  );

  const isMobile = useMediaQuery("(max-width: 600px)");

  if (isMobile) {
    return (
      <ul>
        {recurringBills.map((bill, idx) => (
          <li key={`${bill.name}_${idx}`}>{bill.name}</li>
        ))}
      </ul>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bill Title</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recurringBills.map((bill, idx) => (
          <TableRow key={`${bill.name}_${idx}`}>
            <TableCell>{bill.name}</TableCell>
            <TableCell className="w-[120px]">
              Monthly - {format(bill.date, "do")}
            </TableCell>
            <TableCell className="w-[100px] text-end">
              ${Math.abs(bill.amount).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
