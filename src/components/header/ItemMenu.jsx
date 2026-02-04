import { usePathname } from "next/navigation";
import DropDownLink from "./DropDownLink";
import { NavigationNavBar } from "./ItemNavigation";

const ItemMenu = () => {
  const pathname = usePathname();
  const base = `/${pathname.split("/")[1] || ""}`;

  return (
    <nav>
      <ul className="mx-auto flex items-center gap-8 text-md font-medium text-link-muted">
        {NavigationNavBar.map((item) => {
          const isActive = base === item.href;
          return (
            <li key={item.id}>
              <DropDownLink
                href={item.href}
                dropdownItems={item.dropdownItems}
                className={
                  isActive
                    ? "text-link-active font-semibold"
                    : "text-link-muted hover:text-link-active hover:font-semibold transition"
                }
              >
                {item.text}
              </DropDownLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ItemMenu;
