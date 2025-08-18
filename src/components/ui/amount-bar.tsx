import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function AmountBar({
  amount,
  max,
  themeColor,
  className,
  ...props
}: {
  amount: number;
  max: number;
  themeColor: string;
} & ComponentProps<"div">) {
  const widthPercent = Math.min(Math.round((amount / max) * 100), 100);

  return (
    <div
      className={cn("bg-beige-100 grid h-8 rounded-sm", className)}
      {...props}
    >
      <div
        className="inline rounded-sm"
        style={{
          backgroundColor: themeColor,
          width: `${widthPercent}%`,
        }}
      />
    </div>
  );
}
