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
      <div className="grid grid-cols-[428px_1fr] gap-6">
        <Card>
          <CardContent>
            <BudgetsSummary />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <BudgetsList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
