"use client";

import { ProductType } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    header: "Category",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row?.original?.category?.name}</span>
      );
    },
  },
  {
    header: "Variants",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/products/variants/${row?.original?.id}`}>
          <Badge variant={"outline"} className="font-semibold">
            {row?.original?.variants.length}
          </Badge>
        </Link>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return <Action data={row?.original} />;
    },
  },
];
