import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IconCaretRight from "@/components/ui/svg/icon-caret-right";
import { getTransactions } from "@/data/getTransactions";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";

export default async function TransactionsOverview() {
  const { transactions } = await getTransactions({ page: 1, pageSize: 5 });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Transactions</CardTitle>
        <Button asChild variant="ghost">
          <Link href="/transactions">
            <span>View All</span>
            <IconCaretRight />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-10 text-sm">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="relative size-10 overflow-hidden rounded-full">
                  <Image src={transaction.avatar} alt={transaction.name} fill />
                </div>
                <p className="font-bold">{transaction.name}</p>
              </div>
              <div className="space-y-2 text-end">
                <p
                  className={cn(
                    "font-bold",
                    transaction.amount > 0 && "text-green-900",
                  )}
                >
                  {transaction.amount > 0 && "+"}
                  {numeral(transaction.amount).format("$0,0.00")}
                </p>
                <p>{format(transaction.date, "dd MMM yyyy")}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
