import Navigation from "./navigation";

export default function MobileNav() {
  return (
    <div className="fixed right-0 bottom-0 left-0 rounded-t-xl bg-black px-4 pt-2 text-white sm:px-10 lg:hidden">
      <Navigation />
    </div>
  );
}
