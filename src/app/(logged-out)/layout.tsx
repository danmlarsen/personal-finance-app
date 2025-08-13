import { auth } from "@/auth";
import Logo from "@/components/ui/logo";
import { redirect } from "next/navigation";

export default async function LoggedOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!!session?.user?.id) {
    redirect("/");
  }

  return (
    <div className="grid min-h-screen grid-rows-[70px_1fr]">
      <header className="grid place-items-center rounded-b-lg bg-black">
        <Logo />
      </header>
      <main className="grid place-items-center">{children}</main>
    </div>
  );
}
