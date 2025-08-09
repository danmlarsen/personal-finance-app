import { Card, CardContent } from "@/components/ui/card";
import BudgetsSummary from "./budgets-summary";
import BudgetsList from "./budgets-list";
import AddNewBudgetButton from "./add-new-budget-button";
import { getCategories } from "@/data/getCategories";

export default async function BudgetsPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Budgets</h1>
        <AddNewBudgetButton categories={categories} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[428px_1fr]">
        <Card>
          <CardContent>
            <BudgetsSummary />
          </CardContent>
        </Card>
        <BudgetsList categories={categories} />
      </div>
    </div>
  );
}
