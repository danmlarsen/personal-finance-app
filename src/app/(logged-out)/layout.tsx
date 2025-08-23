import { auth } from "@/auth";
import Logo from "@/components/ui/logo";
import { redirect } from "next/navigation";
import IllustrationAuthentication from "@/assets/images/illustration-authentication.svg";
import Image from "next/image";

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
    <div className="grid min-h-dvh lg:place-items-center">
      <div className="mx-auto grid w-full max-w-[1440px] grid-rows-[70px_1fr] lg:h-[960px] lg:grid-cols-[560px_1fr] lg:grid-rows-1 lg:gap-5 lg:p-5">
        <header className="relative flex items-center justify-center overflow-hidden rounded-b-lg bg-black lg:flex-col lg:items-start lg:justify-between lg:rounded-lg lg:p-10">
          <Image
            src={IllustrationAuthentication}
            alt=""
            fill
            className="hidden object-cover lg:block"
          />
          <Logo className="z-10" />
          <div className="z-10 hidden w-full space-y-6 text-white lg:block">
            <h2 className="text-3xl font-bold">
              Keep track of your money and save for your future
            </h2>
            <p>
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </header>
        <main className="grid place-items-center px-6">{children}</main>
      </div>
    </div>
  );
}
