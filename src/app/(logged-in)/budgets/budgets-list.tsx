import AmountBar from "@/components/ui/amount-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgets, TBudget } from "@/data/getBudgets";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import BudgetsDropdownMenu from "./budgets-dropdownmenu";
import { InferSelectModel } from "drizzle-orm";
import { categoriesTable } from "@/db/schema";
import { Button } from "@/components/ui/button";
import IconCaretRight from "@/components/ui/svg/icon-caret-right";
import numeral from "numeral";

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
                <p className="text-muted-foreground text-sm">
                  Maximum of {numeral(budget.maximum).format("$0,0.00")}
                </p>
                <AmountBar
                  amount={spentAmount}
                  max={maximumAmount}
                  themeColor={budget.theme}
                />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4">
                    <div
                      className="row-span-2 w-1 rounded-md"
                      style={{ backgroundColor: budget.theme }}
                    />
                    <div className="text-muted-foreground text-xs">Spent</div>
                    <div className="font-bold">
                      {numeral(spentAmount).format("$0,0")}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4">
                    <div className="bg-beige-100 row-span-2 w-1 rounded-md" />
                    <div className="text-muted-foreground text-xs">
                      Remaining
                    </div>
                    <div className="font-bold">
                      {numeral(remainingAmount).format("$0,0")}
                    </div>
                  </div>
                </div>

                <Card className="bg-beige-100 gap-3 border-none pb-2 shadow-none">
                  <CardHeader className="flex items-center justify-between px-5">
                    <h3 className="font-bold">Latest Spending</h3>
                    <Button asChild variant="ghost">
                      <Link
                        href={`/transactions/?category=${budget.name.toLowerCase()}`}
                      >
                        <span>See All</span>
                        <IconCaretRight />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="px-5">
                    <ul className="divide-grey-500/15 divide-y">
                      {budget.recentTransactions?.map((transaction) => {
                        const transactionAmount = Number(transaction.amount);

                        return (
                          <li
                            key={transaction.id}
                            className="flex justify-between py-3 text-xs"
                          >
                            <div className="flex items-center gap-4 font-bold">
                              <Image
                                src={transaction.avatar}
                                alt={transaction.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                              <span>{transaction.name}</span>
                            </div>
                            <div className="text-end">
                              <div className="font-bold">
                                {numeral(transactionAmount).format("$0,0.00")}
                              </div>
                              <div className="text-muted-foreground">
                                {format(transaction.created_at, "dd MMM yyyy")}
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
