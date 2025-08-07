import PotsList from "./pots-list";
import AddNewPotButton from "./add-new-pot-button";

export default function PotsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Pots</h1>
        <AddNewPotButton />
      </div>
      <PotsList />
    </div>
  );
}
