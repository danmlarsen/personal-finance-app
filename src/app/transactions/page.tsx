import { Card, CardContent } from "@/components/ui/card";
import TransactionsList from "./transactions-list";

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

  return (
    <div>
      <h1>Transactions</h1>
      <Card>
        <CardContent>
          <TransactionsList
            transactionName={transactionName}
            category={category}
            sortBy={sortBy}
            page={page}
          />
        </CardContent>
      </Card>
    </div>
  );
}
