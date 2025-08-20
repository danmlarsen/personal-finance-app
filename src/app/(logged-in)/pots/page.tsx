import PotsList from "./pots-list";
import AddNewPotButton from "./add-new-pot-button";
import { getPots } from "@/data/getPots";
import { unauthorized } from "next/navigation";
import { auth } from "@/auth";
import { PotsContextProvider } from "./pots-context";

export default async function PotsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    unauthorized();
  }
  const userId = Number(session.user.id);

  const pots = await getPots(userId);

  return (
    <PotsContextProvider value={pots}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Pots</h1>
          <AddNewPotButton />
        </div>
        <PotsList pots={pots} />
      </div>
    </PotsContextProvider>
  );
}
