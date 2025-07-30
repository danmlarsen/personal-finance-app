import AmountBar from "@/components/ui/amount-bar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { transactions, budgets } from "@/data/data.json";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function BudgetsList() {
  return (
    <ul className="space-y-10">
      {budgets.map((budget) => {
        const budgetTransactions = transactions.filter(
          (transaction) => transaction.category === budget.category,
        );
        const recentTransactions = budgetTransactions.slice(-3);
        const spentAmount = recentTransactions.reduce(
          (totalAmount, transaction) =>
            totalAmount + Math.abs(transaction.amount),
          0,
        );
        const remainingAmount = budget.maximum - spentAmount;

        return (
          <li key={budget.category}>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="size-4 rounded-full"
                    style={{ backgroundColor: budget.theme }}
                  />
                  <h2>{budget.category}</h2>
                </div>
                <div>...</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Maximum of ${budget.maximum.toFixed(2)}
                </p>
                <AmountBar
                  amount={spentAmount}
                  max={budget.maximum}
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

                <Card className="border-none bg-amber-50 shadow-none">
                  <CardHeader className="flex items-center justify-between">
                    <h3>Latest Spending</h3>
                    <Link href="#">See All</Link>
                  </CardHeader>
                  <CardContent>
                    <ul className="divide-y divide-amber-200">
                      {recentTransactions.map((transaction, idx) => (
                        <li key={`${transaction.name}_${idx}`}>
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
                              <div>${transaction.amount}</div>
                              <div>
                                {format(transaction.date, "dd MMM yyyy")}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
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
