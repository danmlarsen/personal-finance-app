import PotsList from "./pots-list";
import AddNewPotButton from "./add-new-pot-button";
import { getCachedPots } from "@/data/getPots";
import { unauthorized } from "next/navigation";
import { auth } from "@/auth";
import { PotsContextProvider } from "./pots-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PotsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    unauthorized();
  }
  const userId = Number(session.user.id);

  const pots = await getCachedPots(userId);

  return (
    <PotsContextProvider value={pots}>
      <div className="space-y-8">
        <div className="flex min-h-14 items-center justify-between">
          <h1 className="text-3xl font-bold">Pots</h1>
          <AddNewPotButton />
        </div>
        {pots.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No pots found</CardTitle>
            </CardHeader>
            <CardContent>
              You have no pots yet. Click &quot;Add New Pot&quot; to get
              started.
            </CardContent>
          </Card>
        )}
        {pots.length > 0 && <PotsList pots={pots} />}
      </div>
    </PotsContextProvider>
  );
}
