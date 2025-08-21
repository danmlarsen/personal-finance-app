import { Card, CardContent } from "@/components/ui/card";
import BudgetsSummary from "./budgets-summary";
import BudgetsList from "./budgets-list";
import AddNewBudgetButton from "./add-new-budget-button";
import { getCategories } from "@/data/getCategories";
import { getBudgets } from "@/data/getBudgets";
import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import { BudgetsContextProvider } from "./budgets-context";

export default async function BudgetsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    unauthorized();
  }
  const userId = Number(session.user.id);

  const [budgets, categories] = await Promise.all([
    getBudgets(userId),
    getCategories(),
  ]);

  return (
    <BudgetsContextProvider value={budgets}>
      <div className="@container space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Budgets</h1>
          <AddNewBudgetButton categories={categories} />
        </div>
        <div className="grid items-start gap-6 @4xl:grid-cols-[428px_1fr]">
          <Card>
            <CardContent>
              <BudgetsSummary budgets={budgets} />
            </CardContent>
          </Card>
          <BudgetsList budgets={budgets} categories={categories} />
        </div>
      </div>
    </BudgetsContextProvider>
  );
}
