import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCachedBudgets } from "@/data/getBudgets";
import Link from "next/link";
import BudgetsPieChart from "../budgets/budgets-pie-chart";
import numeral from "numeral";
import IconCaretRight from "@/components/ui/svg/icon-caret-right";

export default async function BudgetsOverview() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = Number(session.user.id);
  const budgets = await getCachedBudgets(userId);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Budgets</CardTitle>
        <Button asChild variant="ghost">
          <Link href="/budgets">
            <span>See Details</span>
            <IconCaretRight />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid items-center md:grid-cols-[1fr_101px]">
        {budgets.length === 0 && <p>You have no budgets yet.</p>}
        {budgets.length > 0 && (
          <>
            <div className="grid min-h-[302px] items-center">
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
                  <p className="text-muted-foreground">{budget.name}</p>
                  <p className="font-bold">
                    {numeral(budget.maximum).format("$0,0.00")}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
