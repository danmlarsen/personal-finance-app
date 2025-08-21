import { cn } from "@/lib/utils";
import { Input } from "./input";

export default function AmountInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className="relative text-sm">
      <span className="text-beige-500 absolute top-1/2 left-5 -translate-y-1/2">
        $
      </span>
      <Input className={cn("pl-10", className)} type="number" {...props} />
    </div>
  );
}
