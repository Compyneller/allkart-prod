"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { StoreTypes } from "@repo/types";
import { storeData } from "data/store";
import Link from "next/link";
import React from "react";

const StoreDropDown = ({
  className,
  ...props
}: React.ComponentProps<"select">) => {
  const { data, isLoading } = storeData();
  if (isLoading) {
    return <Spinner />;
  }
  if (data?.length === 0) {
    return (
      <Link
        className="bg-primary text-sm px-2 py-1 rounded-lg w-fit text-black"
        href="/dashboard/store">
        No store found please create store first
      </Link>
    );
  }

  return (
    <Select
      value={`${props.value}`}
      onValueChange={props.onChange as () => void}>
      <SelectTrigger className="w-full capitalize">
        <SelectValue placeholder="Select Store" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map((item: StoreTypes) => (
            <SelectItem
              className="capitalize"
              value={`${item.id}`}
              key={item.id}>
              {item.shop_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StoreDropDown;
