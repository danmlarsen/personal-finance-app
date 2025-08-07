import { Card, CardContent } from "@/components/ui/card";
import { getBalance } from "@/data/getBalance";

export default async function BalanceOverview() {
  const balance = await getBalance();

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Card className="bg-black text-white">
        <CardContent className="space-y-2 p-5">
          <p>Current Balance</p>
          <p className="text-3xl font-bold">
            ${Number(balance.current).toFixed(2)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-2 p-5">
          <p>Income</p>
          <p className="text-3xl font-bold">
            ${Number(balance.income).toFixed(2)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-2 p-5">
          <p>Expenses</p>
          <p className="text-3xl font-bold">
            ${Number(balance.expenses).toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
