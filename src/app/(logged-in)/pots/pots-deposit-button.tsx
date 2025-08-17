"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { potsTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import PotsTransactionForm from "./pots-transaction-form";
import { useState } from "react";

export default function PotsDepositButton({
  pot,
}: {
  pot: InferSelectModel<typeof potsTable>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          + Add Money
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add to {pot.name}</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
            hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
            aliquet.
          </DialogDescription>
        </DialogHeader>
        <PotsTransactionForm
          pot={pot}
          transactionType="deposit"
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
