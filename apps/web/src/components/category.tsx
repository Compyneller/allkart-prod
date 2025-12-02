"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormControl } from "./ui/form";
import { useState } from "react";
import { fetchCategory } from "data/fetchCat";
import { Spinner } from "./ui/spinner";

export default function Categories({ field, form }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = fetchCategory();
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            onClick={() => setIsOpen(true)}
            role="combobox"
            className={cn(
              "w-full justify-between capitalize",
              !field.value && "text-muted-foreground"
            )}>
            {field.value
              ? data?.find((cat) => cat.id === field.value)?.name
              : "Select Category"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full  p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {data?.map((cat) => (
                <CommandItem
                  className="capitalize"
                  value={cat.name}
                  key={cat.id}
                  onSelect={() => {
                    form.setValue("categoryId", cat.id);
                    setIsOpen(false);
                  }}>
                  {cat.name}
                  <Check
                    className={cn(
                      "ml-auto capitalize",
                      cat.id === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
