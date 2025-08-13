"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePot, editPot } from "./actions";
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
import { InferSelectModel } from "drizzle-orm";
import { potsTable } from "@/db/schema";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PotsForm from "./pots-form";
import z from "zod";
import { potsFormSchema } from "@/validation/potsFormSchema";

export default function PotsDropdownMenu({
  pot,
}: {
  pot: InferSelectModel<typeof potsTable>;
}) {
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function onEditPot(data: z.infer<typeof potsFormSchema>) {
    await editPot(pot.id, data);
    router.refresh();
  }

  async function onDeletePot() {
    await deletePot(pot.id);
    router.refresh();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            Edit Pot
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            Delete Pot
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pot</DialogTitle>
            <DialogDescription>
              If your saving targets change, feel free to update your pots.
            </DialogDescription>
          </DialogHeader>
          <PotsForm
            onSubmit={onEditPot}
            defaultValues={{
              name: pot.name,
              target: pot.target,
              theme: pot.theme,
            }}
            submitButtonText="Save Changes"
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pot.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this pot? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onDeletePot}>
              Yes, Confirm Deletion
            </AlertDialogAction>
            <AlertDialogCancel>No, Go Back</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
