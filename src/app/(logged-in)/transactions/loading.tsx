import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <Skeleton className="h-[40rem]" />
    </div>
  );
}
