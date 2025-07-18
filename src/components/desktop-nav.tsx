"use client";

import { useState } from "react";
import Logo from "./ui/logo";
import { cn } from "@/lib/utils";
import Navigation from "./navigation";

export default function DesktopNav() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      <div className={cn("hidden w-[300px] lg:block", isMinimized && "w-20")} />
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-10 hidden w-[300px] grid-rows-[auto_1fr_auto] rounded-r-xl bg-black pr-6 text-white lg:grid",
          isMinimized && "w-20 pr-0",
        )}
      >
        <div className="py-10 pl-8">
          <Logo variant={isMinimized ? "sm" : "lg"} />
        </div>
        <Navigation variant={isMinimized ? "sm" : "lg"} />
        <button onClick={() => setIsMinimized((isMinimized) => !isMinimized)}>
          minimize
        </button>
      </div>
    </>
  );
}
