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

export default function PotsWithdrawButton({
  pot,
}: {
  pot: InferSelectModel<typeof potsTable>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Withdraw from ‘{pot.name}’</DialogTitle>
          <DialogDescription>
            Withdraw from your pot to put money back in your main balance. This
            will reduce the amount you have in this pot.
          </DialogDescription>
        </DialogHeader>
        <PotsTransactionForm
          pot={pot}
          transactionType="withdraw"
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
