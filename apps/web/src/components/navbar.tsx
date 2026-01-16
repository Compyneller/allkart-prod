'use client'
import { SearchIcon } from "lucide-react";
import { useEffect, useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGeolocation from "hooks/useGeolocation";
import Link from "next/link";
import { Cart } from "./cart/cart";
import { ModeToggle } from "./toggle";
import { Spinner } from "./ui/spinner";
import User from "./user/user";
import Search from "./Home/seach";

const navigationLinks = [
  {
    href: "/",
    label: "Home",
  },
];

export default function Navbar() {
  const id = useId();

  const { address, handleAutomaticAddress, isLoading } = useGeolocation()
  useEffect(() => {
    handleAutomaticAddress()
  }, [])


  return (
    <header className="border-b sticky bg-background top-0 z-20  py-3 px-4 md:px-6">
      <div className="w-full flex items-center gap-5 justify-between">
        <div className="flex items-center gap-3">

          <div >
            <Link href="/" className="text-primary hover:text-primary/90">
              bagalkidukaan
            </Link>
          </div>
          <div className="w-[2px] h-4 bg-border"></div>
          {
            isLoading ? <Spinner /> : <p className=" flex flex-col text-sm font-semibold">
              Address
              <span className="truncate text-xs font-normal">     {address?.display_name}</span></p>
          }
        </div>
        <div className=" hidden md:flex  items-center flex-1 gap-2">
          {/* <SearchIcon /> */}
          <Search />
        </div>
        <div className="flex items-center gap-2 max-md:hidden">

          <ModeToggle />
          <User />

          <Cart />

        </div>
      </div>
    </header>
  );
}

