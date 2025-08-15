import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecurringBills } from "@/data/getRecurringBills";
import { themeColors } from "@/data/themeColors";
import { isPast, isSameMonth } from "date-fns";
import Link from "next/link";

export default async function RecurringBillsOverview() {
  const recurringBills = await getRecurringBills();

  const today = new Date(2024, 7, 12);

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

  const recurringBillsRows = [
    {
      title: "Paid Bills",
      amount: paidBillsAmount,
    },
    {
      title: "Total Upcoming",
      amount: totalUpcomingAmount,
    },
    {
      title: "Due Soon",
      amount: 123,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Recurring Bills</CardTitle>
        <Button asChild>
          <Link href="/recurring-bills">See Details</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recurringBillsRows.map((bill, idx) => (
            <li
              key={idx}
              className="bg-beige-100 flex items-center justify-between rounded-md border-l-4 px-4 py-5"
              style={{ borderLeftColor: themeColors[idx].hex }}
            >
              <p>{bill.title}</p>
              <p>{bill.amount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
