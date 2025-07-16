import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';

import { transactions } from '@/data/data.json';

export default function TransactionsList() {
  return (
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
              <div className="flex gap-2 items-center">
                <Image src={transaction.avatar} alt="Emma" width={40} height={40} className="rounded-full" />
                <span>{transaction.name}</span>
              </div>
            </TableCell>
            <TableCell className="w-[120px]">{transaction.category}</TableCell>
            <TableCell className="w-[120px]">{transaction.date}</TableCell>
            <TableCell className="w-[200px] text-end">{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
