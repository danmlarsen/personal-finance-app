"use client";

import { Button } from "@/components/ui/button";
import IconCaretLeft from "@/components/ui/svg/icon-caret-left";
import IconCaretRight from "@/components/ui/svg/icon-caret-right";
import { useMediaQuery } from "@/hooks/use-media-query";
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

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="grid grid-cols-[auto_1fr_auto]">
      <Button
        variant="outline"
        asChild={curPage > 1}
        disabled={curPage <= 1}
        className="size-10 md:size-auto"
      >
        <Link
          href={`/transactions?page=${curPage > 1 ? curPage - 1 : 1}`}
          className="flex items-center gap-4"
        >
          <IconCaretLeft className="text-grey-500" />
          <span className="hidden md:inline">Prev</span>
        </Link>
      </Button>
      <div className="flex justify-center gap-2">
        {Array.from({ length: numPages }).map((_, idx) => {
          const pageNum = idx + 1;

          if (
            isMobile &&
            ((pageNum === 2 && curPage > 3) ||
              (pageNum === numPages - 1 && curPage < numPages - 2))
          ) {
            return (
              <Button
                variant="outline"
                disabled
                key={idx}
                className="text-grey-500 size-10 px-2 select-none disabled:opacity-100"
              >
                ...
              </Button>
            );
          }

          if (
            isMobile &&
            pageNum !== curPage &&
            pageNum !== 1 &&
            pageNum !== numPages
          )
            return;

          newSearchParams.set("page", pageNum.toString());
          return (
            <Button
              variant={curPage === pageNum ? "default" : "outline"}
              key={idx}
              asChild={curPage !== pageNum}
              className="size-10"
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
        className="size-10 md:size-auto"
      >
        <Link
          href={`/transactions?page=${curPage < numPages ? curPage + 1 : numPages}`}
          className="flex items-center gap-4"
        >
          <span className="hidden md:inline">Next</span>
          <IconCaretRight className="text-grey-500" />
        </Link>
      </Button>
    </div>
  );
}
