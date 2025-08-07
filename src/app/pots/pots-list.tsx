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

export default async function PotsList() {
  const pots = await getPots();

  return (
    <ul className="grid gap-6 lg:grid-cols-2">
      {pots.map((pot) => {
        const percentSaved = Math.min((pot.total / pot.target) * 100, 100);

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
                <PotsDropdownMenu potId={pot.id} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <p>Total Saved</p>
                  <p className="text-3xl font-bold">${pot.total.toFixed(2)}</p>
                </div>
                <AmountBar
                  amount={pot.total}
                  max={pot.target}
                  themeColor={pot.theme}
                />
                <div className="flex items-center justify-between">
                  <p>{percentSaved.toFixed(2)}%</p>
                  <p>Target of ${pot.target}</p>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4">
                <Button variant="secondary">+ Add Money</Button>
                <Button variant="secondary">Withdraw</Button>
              </CardFooter>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
