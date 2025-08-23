import { auth } from "@/auth";
import DesktopNav from "@/components/desktop-nav";
import MobileNav from "@/components/mobile-nav";
import { redirect } from "next/navigation";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <>
      <div className="grid min-h-dvh lg:grid-cols-[auto_1fr]">
        <DesktopNav />
        <main className="px-4 py-6 md:px-10 md:py-8">{children}</main>
      </div>

      <MobileNav />
    </>
  );
}
