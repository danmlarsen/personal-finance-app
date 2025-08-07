import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PotsForm from "./pots-form";

export default function AddNewPotButton() {
  return (
    <Dialog>
      <DialogTrigger>+ Add New Pot</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Pot</DialogTitle>
          <DialogDescription>
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </DialogDescription>
        </DialogHeader>
        <PotsForm />
      </DialogContent>
    </Dialog>
  );
}
