import { Card, CardContent } from "@/components/ui/card";

import { type TRecurringBill } from "@/data/getRecurringBills";
import { isPast, isSameMonth } from "date-fns";

export default function RecurringBillsSummary({
  recurringBills,
}: {
  recurringBills: TRecurringBill[];
}) {
  const today = new Date(2024, 7, 12);

  const totalBillsAmount = recurringBills.reduce(
    (total, transaction) => Math.abs(Number(transaction.amount)) + total,
    0,
  );

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

  return (
    <div>
      <Card>
        <CardContent>
          <p>Total Bills</p>
          <p>${totalBillsAmount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p>Summary</p>
          <ul>
            <li className="flex justify-between">
              <p>Paid Bills</p>
              <p>
                {paidBills.length}(${paidBillsAmount.toFixed(2)})
              </p>
            </li>
            <li className="flex justify-between">
              <p>Total Upcoming</p>
              <p>
                {totalUpcoming.length}(${totalUpcomingAmount.toFixed(2)})
              </p>
            </li>
            <li className="flex justify-between">
              <p>Due Soon</p>
              <p></p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
