import { Card, CardContent } from "@/components/ui/card";

import { type TRecurringBill } from "@/data/getRecurringBills";
import IconRecurringBills from "@/assets/images/icon-recurring-bills.svg";
import Image from "next/image";
import { cn, getRecurringBillsSummary } from "@/lib/utils";

export default function RecurringBillsSummary({
  recurringBills,
  latestTransactionDate = new Date(2024, 7, 19).toString(),
}: {
  recurringBills: TRecurringBill[];
  latestTransactionDate?: string;
}) {
  const totalBillsAmount = recurringBills.reduce(
    (total, transaction) => Math.abs(Number(transaction.amount)) + total,
    0,
  );

  const billsSummary = getRecurringBillsSummary(
    recurringBills,
    latestTransactionDate,
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row lg:flex-col">
      <Card className="bg-grey-900 w-full text-white">
        <CardContent className="space-y-3">
          <Image
            src={IconRecurringBills}
            alt="Recurring bills"
            className="mb-8"
          />
          <p className="text-sm">Total Bills</p>
          <p className="text-3xl font-bold">${totalBillsAmount}</p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent>
          <p className="mb-5 font-bold">Summary</p>
          <ul className="divide-beige-100 divide-y text-xs">
            {billsSummary.map((summary) => (
              <li key={summary.title} className="flex justify-between py-4">
                <p
                  className={cn(
                    "text-muted-foreground",
                    summary.title === "Due Soon" && "text-red-500",
                  )}
                >
                  {summary.title}
                </p>
                <p
                  className={cn(
                    "font-bold",
                    summary.title === "Due Soon" && "text-red-500",
                  )}
                >
                  {summary.amount} (${summary.totalSum.toFixed(2)})
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
