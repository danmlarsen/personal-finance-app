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
import IconElipsis from "@/components/ui/svg/icon-elipsis";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import numeral from "numeral";

export default function PotsDropdownMenu({
  pot,
}: {
  pot: InferSelectModel<typeof potsTable>;
}) {
  const router = useRouter();
  const [editSubmitErrorText, setEditSubmitErrorText] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function onEditPot(data: z.infer<typeof potsFormSchema>) {
    setEditSubmitErrorText("");
    const response = await editPot(pot.id, data);

    if (response.error) {
      setEditSubmitErrorText(response.message);
      return;
    }

    if (response.success) {
      setEditDialogOpen(false);
      router.refresh();
    }
  }

  async function onDeletePot() {
    const response = await deletePot(pot.id);

    if (response.error) {
      toast.error(`An error occurred deleting pot ${pot.name}`);
      return;
    }

    if (response.success) {
      toast.success(
        `Successfully deleted ${pot.name} and transfered ${numeral(pot.total).format("$0,0.00")} back to balance`,
      );
    }

    router.refresh();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-grey-300 hover:bg-transparent"
          >
            <IconElipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            Edit Pot
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            Delete Pot
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
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
            submitErrorText={editSubmitErrorText}
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
