import { Button } from "./ui/button";
import Link from "next/link";
import { navData } from "@/data/nav-data";
import { cn } from "@/lib/utils";

export default function Navigation({
  variant = "lg",
}: {
  variant?: "sm" | "lg";
}) {
  return (
    <nav>
      <ul className="grid grid-cols-5 sm:gap-10 lg:block">
        {navData.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.title}>
              <Button
                asChild
                className={cn(
                  "bg-grey-900 h-11 w-full flex-col sm:h-16 lg:flex-row lg:justify-start lg:gap-4 lg:rounded-none lg:rounded-r-xl lg:pl-8",
                  variant === "sm" && "lg:justify-center lg:pl-0",
                )}
                size="nav"
              >
                <Link href={link.url}>
                  <Icon />
                  {variant === "lg" && (
                    <span className="hidden sm:block">{link.title}</span>
                  )}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
