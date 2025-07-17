import IconNavBudgets from "@/components/ui/svg/icon-nav-budgets";
import IconNavOverview from "@/components/ui/svg/icon-nav-overview";
import IconNavPots from "@/components/ui/svg/icon-nav-pots";
import IconNavRecurringBills from "@/components/ui/svg/icon-nav-recurring-bills";
import IconNavTransactions from "@/components/ui/svg/icon-nav-transactions";

export const navData = [
  {
    title: "Overview",
    url: "/",
    icon: IconNavOverview,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: IconNavTransactions,
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: IconNavBudgets,
  },
  {
    title: "Pots",
    url: "/pots",
    icon: IconNavPots,
  },
  {
    title: "Recurring Bills",
    url: "/recurring-bills",
    icon: IconNavRecurringBills,
  },
];
