"use client";
import {
  Book,
  Home,
  Inbox,
  List,
  ShoppingBasket,
  Store,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SignOut from "features/auth/sign-out";
import { useUserSession } from "hooks/useUserSession";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export enum UserRole {
  ADMIN = "admin",
  SELLER = "seller",
}
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    roles: [UserRole.SELLER, UserRole.ADMIN],
  },
  {
    title: "Users",
    url: "/dashboard/admin/users",
    icon: User,
    roles: [UserRole.ADMIN],
  },

  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
    roles: [UserRole.SELLER, UserRole.ADMIN],
  },
  {
    title: "Store",
    url: "/dashboard/store",
    icon: Store,
    roles: [UserRole.SELLER, UserRole.ADMIN],
  },
  {
    title: "Category",
    url: "/dashboard/admin/category",
    icon: List,
    roles: [UserRole.ADMIN],
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: ShoppingBasket,
    roles: [UserRole.SELLER, UserRole.ADMIN],
  },
];

export function AppSidebar() {
  const { user } = useUserSession();

  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 mb-5">
            <Avatar className="cursor-pointer">
              <AvatarImage src={`${user?.image}`} />
              <AvatarFallback>
                {user?.name ? user?.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <h5 className="font-semibold">{user?.name}</h5>
              <p className="font-medium text-xs">{user?.email}</p>
              <p className="capitalize text-xs">{user?.role}</p>
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map((item) => {
                const isActive = pathname === item.url;
                if (item.roles.includes(user?.role! as UserRole)) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={isActive} asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                return null;
              })}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SignOut />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
