import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCachedPots } from "@/data/getPots";
import Image from "next/image";
import Link from "next/link";
import IconPot from "@/assets/images/icon-pot.svg";
import numeral from "numeral";
import IconCaretRight from "@/components/ui/svg/icon-caret-right";

export default async function PotsOverview() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = Number(session.user.id);
  const pots = await getCachedPots(userId);

  const totalSaved = pots.reduce((total, pot) => total + Number(pot.total), 0);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Pots</CardTitle>
        <Button asChild variant="ghost">
          <Link href="/pots">
            <span>See Details</span>
            <IconCaretRight />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 md:grid-cols-[247px_1fr]">
        <div className="bg-beige-100 flex items-center gap-4 rounded-md p-4">
          <Image src={IconPot} alt="Pot icon" />
          <div className="space-y-3">
            <p className="text-muted-foreground">Total Saved</p>
            <p className="text-3xl font-bold">
              {numeral(totalSaved).format("$0,0")}
            </p>
          </div>
        </div>
        {pots.length === 0 && (
          <p className="flex items-center justify-center">
            You have no pots yet.
          </p>
        )}
        {pots.length > 0 && (
          <ul className="grid grid-cols-2 gap-4">
            {pots.slice(0, 4).map((pot) => (
              <li key={pot.id} className="flex items-center gap-4">
                <div
                  className="h-full w-1 rounded-full"
                  style={{ backgroundColor: pot.theme }}
                />
                <div>
                  <p className="text-muted-foreground text-xs">{pot.name}</p>
                  <p className="text-sm font-bold">
                    {numeral(pot.total).format("$0,0")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
