"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePot } from "./actions";
import { useRouter } from "next/navigation";

export default function PotsDropdownMenu({ potId }: { potId: number }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit Pot</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await deletePot(potId);
            router.refresh();
          }}
        >
          Delete Pot
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
