import { Card, CardContent } from "@/components/ui/card";
import RecurringBillsList from "./recurring-bills-list";
import RecurringBillsSummary from "./recurring-bills-summary";
import { getRecurringBills } from "@/data/getRecurringBills";

export default async function RecurringBillsPage() {
  const recurringBills = await getRecurringBills();

  return (
    <div>
      <div>
        <h1>Recurring Bills</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[337px_1fr]">
        <RecurringBillsSummary recurringBills={recurringBills} />
        <Card>
          <CardContent>
            <RecurringBillsList recurringBills={recurringBills} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
