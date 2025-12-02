"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StoreTypes } from "@repo/types";
import ShopAddress from "@/components/store/forms/address-form";

import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

const AddressDialog = ({ storeData }: { storeData?: StoreTypes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"} onClick={() => handleClick()}>
          {storeData?.address ? (
            <>
              <Pencil /> Edit Address
            </>
          ) : (
            <>
              <Plus /> Add Address
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {storeData?.address ? "Edit Address" : "Create Store"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ShopAddress storeData={storeData?.address!} storeId={storeData?.id!} />
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
