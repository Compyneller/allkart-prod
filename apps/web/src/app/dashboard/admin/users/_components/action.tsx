import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import ChangeRole from "./change-role";
import { UserType } from "@repo/types";
import Ban from "./ban";
import Delete from "./delete";
import { DocumentsDialog } from "./documents";

const Action = ({ data }: { data: UserType }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.role !== "user" && (
          <DropdownMenuItem>
            <Link href={`/dashboard/admin/users/store/${data.id}`}>
              View Store
            </Link>
          </DropdownMenuItem>
        )}

        {data.role === "user" ? null : (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DocumentsDialog userData={data} />
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ChangeRole role={data.role} id={data.id} />
        </DropdownMenuItem>
        {data.role !== "admin" && (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Ban id={data.id} banned={data.banned} />
          </DropdownMenuItem>
        )}

        {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText("1")}>
          Check user session
        </DropdownMenuItem> */}
        <DropdownMenuItem
          className="text-red-500"
          onSelect={(e) => e.preventDefault()}>
          <Delete id={data.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
