import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPots } from "@/data/getPots";
import Image from "next/image";
import Link from "next/link";
import IconPot from "@/assets/images/icon-pot.svg";

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
      <CardContent className="grid gap-5 md:grid-cols-[247px_1fr]">
        <div className="bg-beige-100 flex items-center gap-4 rounded-md p-4">
          <Image src={IconPot} alt="Pot icon" />
          <div>
            <p className="text-muted-foreground">Total Saved</p>
            <p className="text-3xl font-bold">${totalSaved}</p>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {pots.slice(0, 4).map((pot) => (
            <li key={pot.id} className="flex items-center gap-4">
              <div
                className="h-full w-1 rounded-full"
                style={{ backgroundColor: pot.theme }}
              />
              <div>
                <p className="text-muted-foreground text-xs">{pot.name}</p>
                <p className="text-sm">${pot.total}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
