"use client";

import { ProductResponseType } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import { ViewImages } from "./view-images";
import Action from "./action";

export const columns: ColumnDef<ProductResponseType | any>[] = [
  {
    header: "Title",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row?.original?.Product?.title}</span>
      );
    },
  },
  {
    header: "Images",
    cell: ({ row }) => {
      return <ViewImages data={row?.original?.prod_img} />;
    },
  },
  {
    header: "Selling Price",
    cell: ({ row }) => {
      return <span>₹{Number(row?.original?.selling_price)}</span>;
    },
  },
  {
    header: "M.R.P",
    cell: ({ row }) => {
      return <span>₹{Number(row?.original?.mrp)}</span>;
    },
  },
  {
    header: "Unit",
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {row?.original?.unit_value} {row?.original?.unit}
        </span>
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
