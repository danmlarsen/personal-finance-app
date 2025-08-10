import { TBudget } from "@/data/getBudgets";
import BudgetsPieChart from "./budgets-pie-chart";

export default function BudgetsSummary({ budgets }: { budgets: TBudget[] }) {
  return (
    <div>
      <BudgetsPieChart budgets={budgets} />
      <div>
        <h2>Spending Summary</h2>
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
