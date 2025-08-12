import Logo from "@/components/ui/logo";

export default function LoggedOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[70px_1fr]">
      <header className="grid place-items-center rounded-b-lg bg-black">
        <Logo />
      </header>
      <main className="grid place-items-center">{children}</main>
    </div>
  );
}
