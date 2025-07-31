import { Card, CardContent } from "@/components/ui/card";
import RecurringBillsList from "./recurring-bills-list";

export default function RecurringBillsPage() {
  return (
    <div>
      <div>
        <h1>Recurring Bills</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[337px_1fr]">
        <Card>
          <CardContent>total bills</CardContent>
        </Card>
        <Card>
          <CardContent>
            <RecurringBillsList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
