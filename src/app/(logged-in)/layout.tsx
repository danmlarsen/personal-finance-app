import DesktopNav from "@/components/desktop-nav";
import MobileNav from "@/components/mobile-nav";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid min-h-screen lg:grid-cols-[auto_1fr]">
        <DesktopNav />
        <main className="px-4 py-6 md:px-10 md:py-8">{children}</main>
      </div>

      <MobileNav />
    </>
  );
}
