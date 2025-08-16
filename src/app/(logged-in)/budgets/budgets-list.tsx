import AmountBar from "@/components/ui/amount-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgets, TBudget } from "@/data/getBudgets";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import BudgetsDropdownMenu from "./budgets-dropdownmenu";
import { InferSelectModel } from "drizzle-orm";
import { categoriesTable } from "@/db/schema";

export default async function BudgetsList({
  budgets,
  categories,
}: {
  budgets: TBudget[];
  categories: InferSelectModel<typeof categoriesTable>[];
}) {
  return (
    <ul className="space-y-10">
      {budgets.map((budget) => {
        const spentAmount = Math.abs(Number(budget.totalSpent));
        const maximumAmount = Number(budget.maximum);
        const remainingAmount = Math.max(maximumAmount - spentAmount, 0);

        return (
          <li key={budget.id}>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="size-4 rounded-full"
                    style={{ backgroundColor: budget.theme }}
                  />
                  <CardTitle>{budget.name}</CardTitle>
                </div>
                <BudgetsDropdownMenu budget={budget} categories={categories} />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Maximum of ${Number(budget.maximum).toFixed(2)}
                </p>
                <AmountBar
                  amount={spentAmount}
                  max={maximumAmount}
                  themeColor={budget.theme}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4">
                    <div
                      className="row-span-2 w-1 rounded-md"
                      style={{ backgroundColor: budget.theme }}
                    />
                    <div>Spent</div>
                    <div>${spentAmount}</div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4">
                    <div className="row-span-2 w-1 rounded-md bg-amber-50" />
                    <div>Remaining</div>
                    <div>${remainingAmount}</div>
                  </div>
                </div>

                <Card className="bg-beige-100 border-none shadow-none">
                  <CardHeader className="flex items-center justify-between">
                    <h3>Latest Spending</h3>
                    <Link href="#">See All</Link>
                  </CardHeader>
                  <CardContent>
                    <ul className="divide-y divide-amber-200">
                      {budget.recentTransactions?.map((transaction) => {
                        const transactionAmount = Number(transaction.amount);

                        return (
                          <li key={transaction.id}>
                            <div className="flex justify-between py-3">
                              <div className="flex items-center gap-4">
                                <Image
                                  src={transaction.avatar}
                                  alt=""
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                                <span>{transaction.name}</span>
                              </div>
                              <div className="text-end">
                                <div>${transactionAmount}</div>
                                <div>
                                  {format(
                                    transaction.created_at,
                                    "dd MMM yyyy",
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
