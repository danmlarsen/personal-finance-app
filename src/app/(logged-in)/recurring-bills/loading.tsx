import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="flex min-h-14 items-center justify-between">
        <h1 className="text-3xl font-bold">Recurring Bills</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[337px_1fr]">
        <Skeleton className="h-60" />
        <Skeleton className="h-[40rem]" />
      </div>
    </div>
  );
}
