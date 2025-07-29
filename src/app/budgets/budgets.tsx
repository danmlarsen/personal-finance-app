import { Button } from "@/components/ui/button";
import BudgetsSummary from "./budgets-summary";
import BudgetsList from "./budgets-list";
import { Card, CardContent } from "@/components/ui/card";

export default function Budgets() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Budgets</h1>
        <Button>+ Add New Budget</Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[428px_1fr]">
        <Card>
          <CardContent>
            <BudgetsSummary />
          </CardContent>
        </Card>
        <BudgetsList />
      </div>
    </div>
  );
}
