"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PotsForm from "./pots-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddNewPotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>+ Add New Pot</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Pot</DialogTitle>
          <DialogDescription>
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </DialogDescription>
        </DialogHeader>
        <PotsForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
