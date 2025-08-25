import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TransactionsList from "./transactions-list";
import { getTransactions } from "@/data/getTransactions";
import TransactionsOptions from "./transactions-options";
import { getCachedCategories } from "@/data/getCategories";
import TransactionsPagination from "./transactions-pagination";

export const revalidate = 3600; // Revalidate this page every hour

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

  const [categories, { totalNumTransactions, transactions }] =
    await Promise.all([
      getCachedCategories(),
      getTransactions({
        transactionName,
        category,
        sortBy,
        page,
      }),
    ]);

  const numPages = Math.ceil(totalNumTransactions / 10);

  return (
    <div className="space-y-8">
      <div className="flex min-h-14 items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
      </div>
      <Card>
        <CardHeader>
          <TransactionsOptions categories={categories.map((c) => c.name)} />
        </CardHeader>
        <CardContent>
          <TransactionsList transactions={transactions} />
        </CardContent>
        <CardFooter className="block">
          <TransactionsPagination numPages={numPages} />
        </CardFooter>
      </Card>
    </div>
  );
}
