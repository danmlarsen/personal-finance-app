import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TransactionTitle({
  title,
  avatarUrl,
  className,
  ...props
}: React.ComponentProps<"div"> & { title: string; avatarUrl: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <Image
        src={avatarUrl}
        alt={title}
        width={40}
        height={40}
        className="rounded-full"
      />
      <span>{title}</span>
    </div>
  );
}
