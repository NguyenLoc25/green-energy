"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AvatarProfile from "@/components/AvatarProfile";
import LogoutButton from "@/components/LogoutButton";

const UserMenu = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarProfile session={session} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-40">
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
