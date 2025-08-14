import BalanceOverview from "./balance-overview";
import BudgetsOverview from "./budgets-overview";
import PotsOverview from "./pots-overview";
import RecurringBillsOverview from "./recurring-bills-overview";
import TransactionsOverview from "./transactions-overview";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1>Overview</h1>
      <BalanceOverview />
      <PotsOverview />
      <TransactionsOverview />
      <BudgetsOverview />
      <RecurringBillsOverview />
    </div>
  );
}
