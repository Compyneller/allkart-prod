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
import { StoreAddressTypes } from "@repo/types";

import { Pencil, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setIsOpen } from "store/slices/dialogSlice";
import UserAddress from "./address-form";

const AddressDialog = ({ storeData }: { storeData?: StoreAddressTypes }) => {
  const { isOpen } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(setIsOpen(!isOpen))}>
      <DialogTrigger asChild>
        <Button
          size={storeData ? "icon-sm" : "sm"}
          variant={"outline"}
          onClick={() => dispatch(setIsOpen(!isOpen))}>
          {storeData?.address ? (
            <>
              <Pencil />
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
            {storeData?.address ? "Edit Address" : "Add Address"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <UserAddress storeData={storeData} />
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
