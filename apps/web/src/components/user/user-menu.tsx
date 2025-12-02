"use client";
import { useUserSession } from "hooks/useUserSession";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SignOut from "../../features/auth/sign-out";
import Link from "next/link";
import BecomeSeller from "../become-seller";

const UserMenu = ({ data }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={`${data?.image}`} />
          <AvatarFallback>
            {data?.name ? data?.name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{data?.role}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>{data?.name}</DropdownMenuItem>
          <DropdownMenuItem>{data?.email}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {data?.role === "user" ? (
            <DropdownMenuItem>
              <Link href="/onboarding" className="text-accent-foreground">
                Create Store
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <Link href="/dashboard" className="text-accent-foreground">
                <span className="capitalize">{data?.role}</span> Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href="/address">Address</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BecomeSeller />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
