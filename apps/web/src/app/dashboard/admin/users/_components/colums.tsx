"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserType } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "img",
    header: "User Image",
    cell: ({ row }) => {
      return (
        <Avatar className="cursor-pointer">
          <AvatarImage src={`${row?.original?.image}`} />
          <AvatarFallback>
            {row?.original?.name
              ? row?.original?.name.charAt(0).toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "role",
    header: "User Role",
  },
  {
    accessorKey: "banned",
    header: "Ban",
    cell: ({ row }) => {
      const isBanned = row?.original?.banned;
      return (
        <>
          {isBanned ? (
            <Badge variant={"destructive"}>Banned </Badge>
          ) : (
            <Badge variant={"default"}> No ban</Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(`${row.original.createdAt}`);
      return <p>{date?.toLocaleDateString()}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Update At",
    cell: ({ row }) => {
      const date = new Date(`${row.original.updatedAt}`);
      return <p>{date?.toLocaleDateString()}</p>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const data = row?.original;
      return <Action data={data} />;
    },
  },
];
