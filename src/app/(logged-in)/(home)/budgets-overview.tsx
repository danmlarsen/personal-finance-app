import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgets } from "@/data/getBudgets";
import Link from "next/link";
import BudgetsPieChart from "../budgets/budgets-pie-chart";

export default async function BudgetsOverview() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = Number(session.user.id);
  const budgets = await getBudgets(userId);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Budgets</CardTitle>
        <Button asChild>
          <Link href="/budgets">See Details</Link>
        </Button>
      </CardHeader>
      <CardContent className="grid items-center md:grid-cols-[1fr_101px]">
        <div className="min-h-[302px]">
          <BudgetsPieChart budgets={budgets} />
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-1">
          {budgets.slice(0, 4).map((budget) => (
            <li
              key={budget.id}
              className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4 text-xs"
            >
              <div
                className="row-span-2 w-1 rounded-md"
                style={{ backgroundColor: budget.theme }}
              />
              <p>{budget.name}</p>
              <p>{budget.maximum}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
