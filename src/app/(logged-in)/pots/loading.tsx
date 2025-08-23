export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="flex min-h-14 items-center justify-between">
        <h1 className="text-3xl font-bold">Pots</h1>
        <div className="bg-grey-900 h-12 w-32 animate-pulse rounded-md" />
      </div>
      <ul className="grid gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <li key={index}>
            <div className="bg-grey-900 h-60 animate-pulse space-y-4 rounded-md" />
          </li>
        ))}
      </ul>
    </div>
  );
}
