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
import React from "react";

const SelectComp = ({
  className,
  ...props
}: React.ComponentProps<"select">) => {
  const { data, isLoading } = storeData();
  if (isLoading) {
    return <Spinner />;
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

export default SelectComp;
