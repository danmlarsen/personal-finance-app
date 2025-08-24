import { Suspense } from "react";
import BalanceOverview from "./balance-overview";
import BudgetsOverview from "./budgets-overview";
import PotsOverview from "./pots-overview";
import RecurringBillsOverview from "./recurring-bills-overview";
import TransactionsOverview from "./transactions-overview";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="@container space-y-8">
      <div className="flex min-h-14 items-center justify-between">
        <h1 className="text-3xl font-bold">Overview</h1>
      </div>
      <Suspense fallback={<Skeleton className="h-60" />}>
        <BalanceOverview />
      </Suspense>
      <div className="grid gap-6 @5xl:grid-cols-[7fr_5fr]">
        <div className="grid gap-6">
          <Suspense fallback={<Skeleton className="h-60" />}>
            <PotsOverview />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[40rem]" />}>
            <TransactionsOverview />
          </Suspense>
        </div>
        <div className="grid gap-6">
          <Suspense fallback={<Skeleton className="h-60" />}>
            <BudgetsOverview />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[40rem]" />}>
            <RecurringBillsOverview />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
