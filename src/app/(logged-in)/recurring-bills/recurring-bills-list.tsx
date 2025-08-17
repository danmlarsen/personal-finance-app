import TransactionTitle from "@/components/transaction-title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type TRecurringBill } from "@/data/getRecurringBills";
import { format } from "date-fns";
import Image from "next/image";

export default function RecurringBillsList({
  recurringBills,
}: {
  recurringBills: TRecurringBill[];
}) {
  return (
    <div className="@container">
      <ul className="space-y-8 @md:hidden">
        {recurringBills.map((bill) => (
          <li key={bill.id} className="space-y-2">
            <div className="flex items-center gap-4 font-bold">
              <Image
                src={bill.avatar}
                alt={bill.name}
                width={40}
                height={40}
                className="size-10 rounded-full"
              />
              <p>{bill.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Monthly - {format(bill.created_at, "do")}</p>
              <p className="font-bold">
                ${Math.abs(Number(bill.amount)).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden @md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bill Title</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-end">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recurringBills.map((bill) => {
              return (
                <TableRow key={bill.id}>
                  <TableCell>
                    <TransactionTitle
                      title={bill.name}
                      avatarUrl={bill.avatar}
                    />
                  </TableCell>
                  <TableCell className="w-[120px]">
                    Monthly - {format(bill.created_at, "do")}
                  </TableCell>
                  <TableCell className="w-[100px] text-end">
                    ${Math.abs(Number(bill.amount)).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
