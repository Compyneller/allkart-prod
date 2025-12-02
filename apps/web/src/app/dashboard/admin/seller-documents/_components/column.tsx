"use client";

import { sellerDocumentsType } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<sellerDocumentsType>[] = [
  {
    accessorKey: "aadhar",
    header: "Aadhar Number",
  },
  {
    accessorKey: "pancard",
    header: "Pan Card Number",
  },
  {
    accessorKey: "gst",
    header: "GST Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },

  //   {
  //     header: "Actions",
  //     cell: ({ row }) => {
  //       return <Action data={row?.original} />;
  //     },
  //   },
];
