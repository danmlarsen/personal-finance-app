import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactions } from "@/data/getTransactions";
import Link from "next/link";

export default async function TransactionsOverview() {
  const { transactions } = await getTransactions({ page: 1, pageSize: 5 });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Transactions</CardTitle>
        <Button asChild>
          <Link href="/transactions">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between">
              <div>{transaction.name}</div>
              <div>
                <p>{transaction.amount}</p>
                <p>{transaction.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
