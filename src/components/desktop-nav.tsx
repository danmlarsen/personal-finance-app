"use client";

import { useState } from "react";
import Logo from "./ui/logo";
import { cn } from "@/lib/utils";
import Navigation from "./navigation";
import { Button } from "./ui/button";
import IconMinimizeMenu from "./ui/svg/icon-minimize-menu";

export default function DesktopNav() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      <div className={cn("hidden w-[300px] lg:block", isMinimized && "w-20")} />
      <div
        className={cn(
          "bg-grey-900 fixed top-0 bottom-0 left-0 z-10 hidden w-[300px] grid-rows-[auto_1fr_auto] rounded-r-xl pr-6 pb-6 lg:grid",
          isMinimized && "w-20 pr-0",
        )}
      >
        <div className="py-10 pl-8">
          <Logo variant={isMinimized ? "sm" : "lg"} />
        </div>
        <Navigation variant={isMinimized ? "sm" : "lg"} />
        <Button
          variant="ghost"
          onClick={() => setIsMinimized((isMinimized) => !isMinimized)}
          className="hover:bg-grey-900 hover:text-grey-300 h-14 justify-start gap-4 !pl-8 font-bold"
        >
          {!isMinimized && (
            <>
              <IconMinimizeMenu />
              <span>Minimize Menu</span>
            </>
          )}
          {!!isMinimized && <IconMinimizeMenu className="rotate-180" />}
        </Button>
      </div>
    </>
  );
}
