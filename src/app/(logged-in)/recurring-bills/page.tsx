import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RecurringBillsList from "./recurring-bills-list";
import RecurringBillsSummary from "./recurring-bills-summary";
import { getRecurringBills } from "@/data/getRecurringBills";
import RecurringBillsOptions from "./recurring-bills-options";

export default async function RecurringBillsPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; sortby?: string }>;
}) {
  const searchParamValues = await searchParams;
  const billTitle = searchParamValues.title;
  const sortBy = searchParamValues.sortby || "latest";

  const recurringBills = await getRecurringBills({ billTitle, sortBy });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Recurring Bills</h1>
      <div className="grid gap-6 lg:grid-cols-[337px_1fr]">
        <RecurringBillsSummary recurringBills={recurringBills} />
        <Card>
          <CardHeader>
            <RecurringBillsOptions />
          </CardHeader>
          <CardContent>
            <RecurringBillsList recurringBills={recurringBills} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
