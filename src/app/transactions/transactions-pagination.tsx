"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TransactionsPagination({
  numPages,
}: {
  numPages: number;
}) {
  const searchParams = useSearchParams();

  const curPage = Number(searchParams.get("page")) || 1;

  return (
    <div className="grid grid-cols-[auto_1fr_auto]">
      <Button variant="outline" asChild>
        <Link href={`/transactions?page=${curPage > 1 ? curPage - 1 : 1}`}>
          Prev
        </Link>
      </Button>
      <div className="flex justify-center gap-2">
        {Array.from({ length: numPages }).map((_, idx) => (
          <Button variant="outline" key={idx} asChild>
            <Link href={`/transactions?page=${idx + 1}`}>{idx + 1}</Link>
          </Button>
        ))}
      </div>
      <Button asChild variant="outline">
        <Link
          href={`/transactions?page=${curPage < numPages ? curPage + 1 : numPages}`}
        >
          Next
        </Link>
      </Button>
    </div>
  );
}
