"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import z from "zod";
import { budgetFormSchema } from "@/validation/budgetFormSchema";
import { TBudget } from "@/data/getBudgets";
import { deleteBudget, editBudget } from "./actions";
import BudgetsForm from "./budgets-form";
import { InferSelectModel } from "drizzle-orm";
import { categoriesTable } from "@/db/schema";

export default function BudgetsDropdownMenu({
  budget,
  categories,
}: {
  budget: TBudget;
  categories: InferSelectModel<typeof categoriesTable>[];
}) {
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function onEditBudget(data: z.infer<typeof budgetFormSchema>) {
    const response = await editBudget(budget.id, data);

    if (response.success) {
      setEditDialogOpen(false);
      router.refresh();
    }
  }

  async function onDeleteBudget() {
    await deleteBudget(budget.id);
    router.refresh();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            Edit Budget
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            Delete Budget
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>
              As your budgets change, feel free to update your spending limits.
            </DialogDescription>
          </DialogHeader>
          <BudgetsForm
            onSubmit={onEditBudget}
            categories={categories}
            defaultValues={{
              category: budget.category_id,
              maximum: budget.maximum,
              theme: budget.theme,
            }}
            submitButtonText="Save Changes"
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {budget.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this budget? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onDeleteBudget}>
              Yes, Confirm Deletion
            </AlertDialogAction>
            <AlertDialogCancel>No, Go Back</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
