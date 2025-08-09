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
import z from "zod";
import { potsFormSchema } from "@/validation/potsFormSchema";
import { createPot } from "./actions";
import { useRouter } from "next/navigation";

export default function AddNewPotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(data: z.infer<typeof potsFormSchema>) {
    const response = await createPot(data);

    if (response.success) {
      router.refresh();
      setIsOpen(false);
    }
  }

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
        <PotsForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
