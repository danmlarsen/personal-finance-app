import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TransactionTitle from "@/components/transaction-title";
import { getTransactions } from "@/data/getTransactions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TransactionsList({
  transactionName,
  category = "all",
  sortBy = "latest",
  page = 1,
}: {
  transactionName?: string;
  category?: string;
  sortBy?: string;
  page?: number;
}) {
  const { totalNumTransactions, transactions } = await getTransactions({
    transactionName,
    category,
    sortBy,
    page,
  });

  const numPages = Math.ceil(totalNumTransactions / 10);

  return (
    <>
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
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                <TransactionTitle
                  title={transaction.name}
                  avatarUrl={transaction.avatar}
                />
              </TableCell>
              <TableCell className="w-[120px]">
                {transaction.category}
              </TableCell>
              <TableCell className="w-[120px]">{transaction.date}</TableCell>
              <TableCell className="w-[200px] text-end">
                {transaction.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="grid grid-cols-[auto_1fr_auto]">
        <Button variant="outline" asChild>
          <Link href={`/transactions?page=${page > 1 ? page - 1 : 1}`}>
            Prev
          </Link>
        </Button>
        <div className="flex justify-center gap-2">
          {Array.from({ length: numPages }).map((_, idx) => (
            <Button variant="outline" key={idx} asChild>
              <Link href={`/transactions?page=${idx + 1}`}>{idx + 1}</Link>
            </Button>
          ))}
        </div>
        <Button asChild variant="outline">
          <Link
            href={`/transactions?page=${page < numPages ? page + 1 : numPages}`}
          >
            Next
          </Link>
        </Button>
      </div>
    </>
  );
}
