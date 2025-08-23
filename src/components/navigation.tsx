import { navData } from "@/data/nav-data";
import NavigationItem from "./navigation-item";

export default function Navigation({
  variant = "lg",
}: {
  variant?: "sm" | "lg";
}) {
  return (
    <nav>
      <ul className="grid grid-cols-5 sm:gap-10 lg:block">
        {navData.map(({ icon: Icon, ...link }) => {
          return (
            <NavigationItem
              key={link.title}
              title={link.title}
              url={link.url}
              icon={<Icon />}
              variant={variant}
            />
          );
        })}
      </ul>
    </nav>
  );
}
