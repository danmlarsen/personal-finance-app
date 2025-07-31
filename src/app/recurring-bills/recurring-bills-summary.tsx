import { Card, CardContent } from "@/components/ui/card";

import { transactions } from "@/data/data.json";
import { uniqueTransactionByName } from "@/lib/utils";
import { isPast, isSameMonth } from "date-fns";

export default function RecurringBillsSummary() {
  const today = new Date(2024, 7, 12);

  const validTransactions = transactions.filter(
    (transaction) => transaction.recurring,
  );

  const totalBillsAmount = uniqueTransactionByName(validTransactions).reduce(
    (total, transaction) => Math.abs(transaction.amount) + total,
    0,
  );

  const paidBills = validTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return isSameMonth(today, transactionDate) && isPast(transactionDate);
  });
  const paidBillsAmount = paidBills.reduce(
    (total, transaction) => Math.abs(transaction.amount) + total,
    0,
  );

  const totalUpcoming = validTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getDate() > today.getDate();
  });
  const totalUpcomingAmount = totalUpcoming.reduce(
    (total, transaction) => Math.abs(transaction.amount) + total,
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
    </div>
  );
}
