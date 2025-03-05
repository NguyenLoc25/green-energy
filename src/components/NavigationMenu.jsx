import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenuComponent = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap gap-5">
        <NavigationMenuItem>
          <Link href="/" passHref>
            <span className={cn(navigationMenuTriggerStyle(), "menu-item font-bold text-lg hover:bg-purple-600 hover:scale-110 transition-all")}>
              Home
            </span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/manage-form" passHref>
            <span className={cn(navigationMenuTriggerStyle(), "menu-item font-bold text-lg hover:bg-purple-600 hover:scale-110 transition-all")}>
              Manage Forms
            </span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/question" passHref>
            <span className={cn(navigationMenuTriggerStyle(), "menu-item font-bold text-lg hover:bg-purple-600 hover:scale-110 transition-all")}>
              Survey
            </span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuComponent;
