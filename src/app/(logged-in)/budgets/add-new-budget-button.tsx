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
import { InferSelectModel } from "drizzle-orm";
import { categoriesTable } from "@/db/schema";
import { createBudget } from "./actions";
import { toast } from "sonner";

export default function AddNewBudgetButton({
  categories,
}: {
  categories: InferSelectModel<typeof categoriesTable>[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(data: z.infer<typeof budgetFormSchema>) {
    const response = await createBudget(data);

    if (response.success) {
      router.refresh();
      setIsOpen(false);

      const createdBudgetName = categories.find(
        (category) => category.id === data.category,
      )?.name;

      toast.success(
        `Budget${createdBudgetName ? ` for category: ${createdBudgetName}` : ""} created successfully.`,
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">+ Add New Budget</Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
        </DialogHeader>
        <BudgetsForm onSubmit={handleSubmit} categories={categories} />
      </DialogContent>
    </Dialog>
  );
}
