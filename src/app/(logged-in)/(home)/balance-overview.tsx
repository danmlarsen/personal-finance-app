import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { getBalance } from "@/data/getBalance";
import { notFound, unauthorized } from "next/navigation";

export default async function BalanceOverview() {
  const session = await auth();
  if (!session?.user?.id) {
    unauthorized();
  }

  const balance = await getBalance(Number(session.user.id));

  if (!balance) {
    notFound();
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Card className="bg-grey-900 text-white">
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
