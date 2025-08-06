import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TransactionsList from "./transactions-list";
import { getTransactions } from "@/data/getTransactions";
import TransactionsOptions from "./transactions-options";
import { getCategories } from "@/data/getCategories";
import TransactionsPagination from "./transactions-pagination";

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
          <TransactionsPagination numPages={numPages} />
        </CardFooter>
      </Card>
    </div>
  );
}
