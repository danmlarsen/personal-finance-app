import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BudgetsSummary from "./budgets-summary";
import BudgetsList from "./budgets-list";
import AddNewBudgetButton from "./add-new-budget-button";
import { getCachedCategories } from "@/data/getCategories";
import { getCachedBudgets } from "@/data/getBudgets";
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
    getCachedBudgets(userId),
    getCachedCategories(),
  ]);

  return (
    <BudgetsContextProvider value={budgets}>
      <div className="@container space-y-8">
        <div className="flex min-h-14 items-center justify-between">
          <h1 className="text-3xl font-bold">Budgets</h1>
          <AddNewBudgetButton categories={categories} />
        </div>

        {budgets.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No budgets found</CardTitle>
            </CardHeader>
            <CardContent>
              You have no budgets yet. Click &quot;Add New Budget&quot; to get
              started.
            </CardContent>
          </Card>
        )}
        {budgets.length > 0 && (
          <div className="grid items-start gap-6 @4xl:grid-cols-[428px_1fr]">
            <Card>
              <CardContent>
                <BudgetsSummary budgets={budgets} />
              </CardContent>
            </Card>
            <BudgetsList budgets={budgets} categories={categories} />
          </div>
        )}
      </div>
    </BudgetsContextProvider>
  );
}
