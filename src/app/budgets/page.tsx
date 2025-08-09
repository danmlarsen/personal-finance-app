import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BudgetsSummary from "./budgets-summary";
import BudgetsList from "./budgets-list";
import AddNewBudgetButton from "./add-new-budget-button";

export default function BudgetsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Budgets</h1>
        <AddNewBudgetButton />
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
