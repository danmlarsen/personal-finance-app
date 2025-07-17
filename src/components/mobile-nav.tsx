import Link from "next/link";
import { Button } from "./ui/button";
import IconNavOverview from "./ui/svg/icon-nav-overview";
import IconNavTransactions from "./ui/svg/icon-nav-transactions";
import IconNavBudgets from "./ui/svg/icon-nav-budgets";
import IconNavPots from "./ui/svg/icon-nav-pots";
import IconNavRecurringBills from "./ui/svg/icon-nav-recurring-bills";

const navData = [
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

export default function MobileNav() {
  return (
    <div className="fixed right-0 bottom-0 left-0 rounded-t-xl bg-black px-4 pt-2 text-white sm:px-10 lg:hidden">
      <nav>
        <ul className="grid grid-cols-5 sm:gap-10">
          {navData.map((link) => {
            const Icon = link.icon;

            return (
              <li key={link.title}>
                <Button
                  asChild
                  className="h-11 w-full flex-col bg-black sm:h-16"
                >
                  <Link href={link.url}>
                    <Icon />
                    <span className="hidden sm:block">{link.title}</span>
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
