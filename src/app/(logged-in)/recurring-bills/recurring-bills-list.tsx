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

export default function RecurringBillsList({
  recurringBills,
}: {
  recurringBills: TRecurringBill[];
}) {
  // const isMobile = useMediaQuery("(max-width: 600px)");

  // if (isMobile) {
  //   return (
  //     <ul>
  //       {recurringBills.map((bill, idx) => (
  //         <li key={`${bill.name}_${idx}`}>{bill.name}</li>
  //       ))}
  //     </ul>
  //   );
  // }

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
        {recurringBills.map((bill, idx) => {
          return (
            <TableRow key={`${bill.name}_${idx}`}>
              <TableCell>
                <TransactionTitle title={bill.name} avatarUrl={bill.avatar} />
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
  );
}
