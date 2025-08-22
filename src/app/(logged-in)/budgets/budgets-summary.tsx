import { TBudget } from "@/data/getBudgets";
import BudgetsPieChart from "./budgets-pie-chart";

export default function BudgetsSummary({ budgets }: { budgets: TBudget[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(280px,1fr)_1fr] lg:grid-cols-1">
      <div className="grid min-h-[302px] items-center">
        <BudgetsPieChart budgets={budgets} />
      </div>
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Spending Summary</h2>
        <ul className="space-y-8">
          {budgets.map((budget) => (
            <li key={budget.id} className="flex gap-4">
              <div
                className="w-1 rounded-full"
                style={{ backgroundColor: budget.theme }}
              />
              <div className="flex grow items-center justify-between">
                <p>{budget.name}</p>
                <p>
                  <strong>
                    ${Math.abs(Number(budget.totalSpent)).toFixed(2)}
                  </strong>{" "}
                  of ${Number(budget.maximum).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
