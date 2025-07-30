import { Button } from "@/components/ui/button";
import PotsList from "./pots-list";

export default function Pots() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Pots</h1>
        <Button>+ Add New Pot</Button>
      </div>
      <PotsList />
    </div>
  );
}
