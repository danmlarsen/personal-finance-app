import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPots } from "@/data/getPots";
import Link from "next/link";

export default async function PotsOverview() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = Number(session.user.id);
  const pots = await getPots(userId);

  const totalSaved = pots.reduce((total, pot) => total + Number(pot.total), 0);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Pots</CardTitle>
        <Button asChild>
          <Link href="/pots">See Details</Link>
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-[247px_1fr]">
        <div>
          <p>Total Saved</p>
          <p>${totalSaved}</p>
        </div>
        <ul className="grid grid-cols-2">
          {pots.slice(0, 4).map((pot) => (
            <li key={pot.id}>
              <p>{pot.name}</p>
              <p>{pot.total}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
