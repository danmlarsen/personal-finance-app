import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="@container space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <Skeleton className="h-14 w-36" />
      </div>

      <div className="grid items-start gap-6 @4xl:grid-cols-[428px_1fr]">
        <Skeleton className="h-[30rem]" />
        <div className="space-y-6">
          <Skeleton className="h-[30rem]" />
          <Skeleton className="h-[30rem]" />
        </div>
      </div>
    </div>
  );
}
