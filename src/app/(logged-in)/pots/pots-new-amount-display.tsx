import { potsTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import numeral from "numeral";

export default function PotsNewAmountDisplay({
  pot,
  amount,
  transactionType,
}: {
  pot: InferSelectModel<typeof potsTable>;
  amount: number;
  transactionType: "deposit" | "withdraw";
}) {
  const potTotal = Number(pot.total);
  const potTarget = Number(pot.target);

  const newAmount =
    transactionType === "deposit"
      ? potTotal + amount
      : Math.max(potTotal - amount, 0);

  const currentPercent = Math.min((potTotal / potTarget) * 100, 100);
  const amountPercent =
    transactionType === "deposit"
      ? Math.min((amount / potTarget) * 100, 100 - currentPercent)
      : Math.min((amount / potTotal) * 100, potTotal);
  const newPercent = Math.min(newAmount / potTarget, 100);

  return (
    <div className="text-muted-foreground space-y-3 py-2">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm">New Amount</p>
        <p className="text-grey-900 text-3xl font-bold">
          {numeral(newAmount).format("$0,0.00")}
        </p>
      </div>

      <div className="bg-beige-100 flex h-2 gap-0.5 overflow-hidden rounded-md">
        <div
          className={cn(
            "flex h-2 justify-end overflow-hidden bg-black",
            transactionType === "withdraw" && "rounded-r-md",
          )}
          style={{ width: `${currentPercent}%` }}
        >
          {transactionType === "withdraw" && (
            <div
              className="border-l-beige-100 h-2 border-l-2 bg-red-500"
              style={{ width: `${amountPercent}%` }}
            />
          )}
        </div>
        {transactionType === "deposit" && (
          <div
            className="h-2 rounded-r-md bg-green-500"
            style={{ width: `${amountPercent}%` }}
          />
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <p
          className={cn(
            "font-bold",
            transactionType === "deposit" && "text-green-500",
            transactionType === "withdraw" && "text-red-500",
          )}
        >
          {numeral(newPercent).format("0.0[0]%")}
        </p>
        <p>Target of ${potTarget}</p>
      </div>
    </div>
  );
}
