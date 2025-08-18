import AmountBar from "@/components/ui/amount-bar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPots } from "@/data/getPots";
import PotsDropdownMenu from "./pots-dropdown-menu";
import PotsDepositButton from "./pots-deposit-button";
import PotsWithdrawButton from "./pots-withdraw-button";
import { InferSelectModel } from "drizzle-orm";
import { potsTable } from "@/db/schema";
import numeral from "numeral";

export default async function PotsList({
  pots,
}: {
  pots: InferSelectModel<typeof potsTable>[];
}) {
  return (
    <ul className="grid gap-6 lg:grid-cols-2">
      {pots.map((pot) => {
        const potTotal = Number(pot.total);
        const potTarget = Number(pot.target);
        const percentSaved = Math.min(potTotal / potTarget, 100);

        return (
          <li key={pot.name}>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-4">
                  <div
                    className="size-4 rounded-full"
                    style={{ backgroundColor: pot.theme }}
                  />
                  <h2>{pot.name}</h2>
                </CardTitle>
                <PotsDropdownMenu pot={pot} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">Total Saved</p>
                  <p className="text-3xl font-bold">
                    {numeral(potTotal).format("$0,0.00")}
                  </p>
                </div>
                <AmountBar
                  amount={potTotal}
                  max={potTarget}
                  themeColor={pot.theme}
                  className="h-2"
                />
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <p className="font-bold">
                    {numeral(percentSaved).format("0.0[0]%")}
                  </p>
                  <p>Target of {numeral(potTarget).format("$0,0")}</p>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4">
                <PotsDepositButton pot={pot} />
                <PotsWithdrawButton pot={pot} />
              </CardFooter>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
