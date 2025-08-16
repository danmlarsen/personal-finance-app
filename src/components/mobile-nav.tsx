import Navigation from "./navigation";

export default function MobileNav() {
  return (
    <>
      <div className="mt-[74px] lg:hidden" />
      <div className="bg-grey-900 fixed right-0 bottom-0 left-0 rounded-t-xl px-4 pt-2 text-white sm:px-10 lg:hidden">
        <Navigation />
      </div>
    </>
  );
}
