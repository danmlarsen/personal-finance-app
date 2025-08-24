import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="flex min-h-14 items-center justify-between">
        <h1 className="text-3xl font-bold">Pots</h1>
        <Skeleton className="h-14 w-32" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-60" />
        ))}
      </div>
    </div>
  );
}
