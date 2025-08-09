"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import z from "zod";
import { useRouter } from "next/navigation";
import { budgetFormSchema } from "@/validation/budgetFormSchema";
import BudgetsForm from "./budgets-form";

export default function AddNewBudgetButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(data: z.infer<typeof budgetFormSchema>) {}

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>+ Add New Budget</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
        </DialogHeader>
        <BudgetsForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
