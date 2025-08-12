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

  const newSearchParams = new URLSearchParams(searchParams.toString());

  const name = searchParams.get("name");
  const sortBy = searchParams.get("sortby");
  const category = searchParams.get("category");

  if (name) newSearchParams.set("name", name);
  if (sortBy) newSearchParams.set("sortby", sortBy);
  if (category) newSearchParams.set("category", category);

  return (
    <div className="grid grid-cols-[auto_1fr_auto]">
      <Button variant="outline" asChild={curPage > 1} disabled={curPage <= 1}>
        <Link href={`/transactions?page=${curPage > 1 ? curPage - 1 : 1}`}>
          Prev
        </Link>
      </Button>
      <div className="flex justify-center gap-2">
        {Array.from({ length: numPages }).map((_, idx) => {
          const pageNum = idx + 1;
          newSearchParams.set("page", pageNum.toString());

          return (
            <Button
              variant="outline"
              key={idx}
              asChild={curPage !== pageNum}
              disabled={curPage === pageNum}
            >
              <Link href={`/transactions?${newSearchParams.toString()}`}>
                {pageNum}
              </Link>
            </Button>
          );
        })}
      </div>
      <Button
        variant="outline"
        asChild={curPage < numPages}
        disabled={curPage >= numPages}
      >
        <Link
          href={`/transactions?page=${curPage < numPages ? curPage + 1 : numPages}`}
        >
          Next
        </Link>
      </Button>
    </div>
  );
}
