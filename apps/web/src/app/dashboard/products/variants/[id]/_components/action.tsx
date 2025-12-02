"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductResponseType } from "@repo/types";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { CreateVariant } from "./create";
import DeleteVariant from "./delete";

const Action = ({ data }: { data: ProductResponseType }) => {
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
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2"
            href={`/product/${data?.Product?.id}/variant/${data?.id}`}>
            <Eye /> Detail
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <CreateVariant pid={data?.Product?.id} variant={data} />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteVariant img={data?.prod_img} id={data?.id} />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigator.clipboard.writeText("1")}>
          Check user session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
