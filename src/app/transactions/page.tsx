import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TransactionsList from "./transactions-list";
import { getTransactions } from "@/data/getTransactions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TransactionsOptions from "./transactions-options";
import { getCategories } from "@/data/getCategories";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    name: string;
    sortby: string;
    category: string;
    page: string;
  }>;
}) {
  const searchParamValues = await searchParams;
  const transactionName = searchParamValues.name;
  const sortBy = searchParamValues.sortby || "latest";
  const category = searchParamValues.category || "all";
  const page = Number(searchParamValues.page) || 1;

  const categories = await getCategories();
  const { totalNumTransactions, transactions } = await getTransactions({
    transactionName,
    category,
    sortBy,
    page,
  });

  const numPages = Math.ceil(totalNumTransactions / 10);

  return (
    <div>
      <h1>Transactions</h1>
      <Card>
        <CardHeader>
          <TransactionsOptions categories={categories} />
        </CardHeader>
        <CardContent>
          <TransactionsList transactions={transactions} />
        </CardContent>
        <CardFooter className="block">
          <div className="grid grid-cols-[auto_1fr_auto]">
            <Button variant="outline" asChild>
              <Link href={`/transactions?page=${page > 1 ? page - 1 : 1}`}>
                Prev
              </Link>
            </Button>
            <div className="flex justify-center gap-2">
              {Array.from({ length: numPages }).map((_, idx) => (
                <Button variant="outline" key={idx} asChild>
                  <Link href={`/transactions?page=${idx + 1}`}>{idx + 1}</Link>
                </Button>
              ))}
            </div>
            <Button asChild variant="outline">
              <Link
                href={`/transactions?page=${page < numPages ? page + 1 : numPages}`}
              >
                Next
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
