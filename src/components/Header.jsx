// "use client";

import * as React from "react";
import Link from "next/link";
// import { useEffect } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/LogoutButton";
import LoginButton from "@/components/LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

const Header = async () => {
    const session = await getServerSession(authOptions);
    const isAuth = !!session;

    console.log("Auth status:", isAuth);
  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-b-2 shadow-lg py-3 px-5 md:px-10 lg:px-20">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <h1 className="text-lg font-bold tracking-wide font-sans">Survey Web</h1>

        {/* Navigation Menu */}
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


        
        {/* Account Section */}
        {isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar>
                  <AvatarImage src={session.user?.image || "/default-avatar.png"} />
                  <AvatarFallback>{session.user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm">{session.user?.name || "User"}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-40">
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-200 transition-all">
                Đăng nhập
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden">
                <DropdownMenuItem>
                  <Link href="/login">
                    <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Đăng nhập với tư cách nhà phát triển</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LoginButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
      </div>
    </header>
  );
};

export default Header;