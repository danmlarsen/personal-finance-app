import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TransactionTitle from "@/components/transaction-title";
import { type TTransaction } from "@/data/getTransactions";
import numeral from "numeral";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";

export default async function TransactionsList({
  transactions,
}: {
  transactions: TTransaction[];
}) {
  return (
    <>
      <ul className="space-y-8 md:hidden">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-4">
              <Image
                src={transaction.avatar}
                alt={transaction.name}
                width={40}
                height={40}
                className="size-10 rounded-full"
              />
              <div>
                <p className="font-bold">{transaction.name}</p>
                <p className="text-muted-foreground">{transaction.category}</p>
              </div>
            </div>
            <div>
              <p
                className={cn(
                  "font-bold",
                  transaction.amount > 0 && "text-green-500",
                )}
              >
                {transaction.amount > 0 && "+"}
                {numeral(transaction.amount).format("$0,0.00")}
              </p>
              <p className="text-muted-foreground">{transaction.date}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient / Sender</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Transaction Date</TableHead>
              <TableHead className="text-end">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <TransactionTitle
                    title={transaction.name}
                    avatarUrl={transaction.avatar}
                  />
                </TableCell>
                <TableCell className="w-[120px]">
                  {transaction.category}
                </TableCell>
                <TableCell className="w-[120px]">
                  {format(transaction.date, "dd MMM yyyy")}
                </TableCell>
                <TableCell
                  className={cn(
                    "w-[200px] text-end",
                    transaction.amount > 0 && "text-green-500",
                  )}
                >
                  {transaction.amount > 0 && "+"}
                  {numeral(transaction.amount).format("$0,0.00")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
