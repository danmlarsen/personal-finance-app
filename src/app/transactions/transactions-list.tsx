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

export default async function TransactionsList({
  transactions,
}: {
  transactions: TTransaction[];
}) {
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
    </>
  );
}
