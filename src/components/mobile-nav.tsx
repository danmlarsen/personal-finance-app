import Link from "next/link";
import { Button } from "./ui/button";
import { navData } from "@/data/nav-data";

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
