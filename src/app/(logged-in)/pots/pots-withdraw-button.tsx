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
        <Button>Withdraw</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw from {pot.name}</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
            hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
            aliquet.
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
