import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="flex min-h-14 items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
      </div>
      <Skeleton className="h-[40rem]" />
    </div>
  );
}
