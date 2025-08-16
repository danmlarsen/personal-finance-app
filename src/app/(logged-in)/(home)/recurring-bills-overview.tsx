import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecurringBills } from "@/data/getRecurringBills";
import { themeColors } from "@/data/themeColors";
import { getRecurringBillsSummary } from "@/lib/utils";
import Link from "next/link";

export default async function RecurringBillsOverview() {
  const recurringBills = await getRecurringBills();

  const billsSummary = getRecurringBillsSummary(
    recurringBills,
    new Date(2024, 7, 19).toString(),
  );

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
          {billsSummary.map((bill, idx) => (
            <li
              key={idx}
              className="bg-beige-100 flex items-center justify-between rounded-md border-l-4 px-4 py-5"
              style={{ borderLeftColor: themeColors[idx].hex }}
            >
              <p>{bill.title}</p>
              <p>${bill.totalSum.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
