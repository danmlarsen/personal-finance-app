import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { getBalance } from "@/data/getBalance";
import { notFound, unauthorized } from "next/navigation";
import numeral from "numeral";

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
          <p className="text-sm">Current Balance</p>
          <p className="text-3xl font-bold">
            {numeral(balance.current).format("$0,0.00")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-2 p-5">
          <p className="text-muted-foreground text-sm">Income</p>
          <p className="text-3xl font-bold">
            {numeral(balance.income).format("$0,0.00")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-2 p-5">
          <p className="text-muted-foreground text-sm">Expenses</p>
          <p className="text-3xl font-bold">
            {numeral(balance.expenses).format("$0,0.00")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
