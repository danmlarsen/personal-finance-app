"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavigationItem({
  title,
  url,
  icon,
  variant,
}: {
  title: string;
  url: string;
  icon: React.ReactNode;
  variant?: "sm" | "lg";
}) {
  const pathname = usePathname();

  return (
    <li key={title}>
      <Button
        asChild
        className={cn(
          "bg-grey-900 hover:bg-grey-900 hover:text-grey-100 text-grey-300 h-11 w-full flex-col rounded-none rounded-t-md sm:h-16 lg:flex-row lg:justify-start lg:gap-4 lg:rounded-none lg:rounded-r-xl lg:pl-8",
          variant === "sm" && "lg:justify-center lg:pl-0",
          pathname === url &&
            "bg-beige-100 text-grey-900 hover:bg-beige-100 hover:text-grey-900 border-b-4 border-green-500 lg:border-b-0 lg:border-l-4",
        )}
        size="nav"
      >
        <Link href={url}>
          <span className={cn("", pathname === url && "text-green-500")}>
            {icon}
          </span>
          {variant === "lg" && <span className="hidden sm:block">{title}</span>}
        </Link>
      </Button>
    </li>
  );
}
