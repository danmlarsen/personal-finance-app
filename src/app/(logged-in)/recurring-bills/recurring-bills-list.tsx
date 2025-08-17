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
import IconBillDue from "@/assets/images/icon-bill-due.svg";
import IconBillPaid from "@/assets/images/icon-bill-paid.svg";
import { cn } from "@/lib/utils";

export default function RecurringBillsList({
  recurringBills,
}: {
  recurringBills: TRecurringBill[];
}) {
  const today = new Date(2024, 7, 19);

  return (
    <div className="@container">
      <ul className="divide-beige-100 divide-y text-sm @md:hidden">
        {recurringBills.map((bill) => {
          const transactionDate = new Date(bill.created_at);

          const isPaid = today.getDate() > transactionDate.getDate();
          const isDue =
            !isPaid && today.getDate() >= transactionDate.getDate() - 5;

          return (
            <li key={bill.id} className="space-y-2 py-5">
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
                <div
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    isPaid && "text-green-500",
                    isDue && "text-red-500",
                  )}
                >
                  <p>Monthly - {format(bill.created_at, "do")}</p>
                  {isPaid && <Image src={IconBillPaid} alt="Bill paid icon" />}
                  {isDue && <Image src={IconBillDue} alt="Bill due icon" />}
                </div>
                <p className={cn("font-bold", isDue && "text-red-500")}>
                  ${Math.abs(Number(bill.amount)).toFixed(2)}
                </p>
              </div>
            </li>
          );
        })}
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
              const transactionDate = new Date(bill.created_at);

              const isPaid = today.getDate() > transactionDate.getDate();
              const isDue =
                !isPaid && today.getDate() >= transactionDate.getDate() - 5;

              return (
                <TableRow key={bill.id}>
                  <TableCell>
                    <TransactionTitle
                      title={bill.name}
                      avatarUrl={bill.avatar}
                    />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "flex w-[120px] items-center gap-2 text-xs",
                      isPaid && "text-green-500",
                      isDue && "text-red-500",
                    )}
                  >
                    <p>Monthly - {format(bill.created_at, "do")}</p>
                    {isPaid && (
                      <Image src={IconBillPaid} alt="Bill paid icon" />
                    )}
                    {isDue && <Image src={IconBillDue} alt="Bill due icon" />}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "w-[100px] text-end font-bold",
                      isDue && "text-red-500",
                    )}
                  >
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
