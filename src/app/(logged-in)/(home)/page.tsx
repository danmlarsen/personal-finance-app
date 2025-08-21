import BalanceOverview from "./balance-overview";
import BudgetsOverview from "./budgets-overview";
import PotsOverview from "./pots-overview";
import RecurringBillsOverview from "./recurring-bills-overview";
import TransactionsOverview from "./transactions-overview";

export default function Home() {
  return (
    <div className="@container space-y-8">
      <h1 className="text-3xl font-bold">Overview</h1>
      <BalanceOverview />
      <div className="grid gap-6 @5xl:grid-cols-[7fr_5fr]">
        <div className="grid gap-6">
          <PotsOverview />
          <TransactionsOverview />
        </div>
        <div className="grid gap-6">
          <BudgetsOverview />
          <RecurringBillsOverview />
        </div>
      </div>
    </div>
  );
}
