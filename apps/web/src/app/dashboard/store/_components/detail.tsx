"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { addressTypes, StoreAddressTypes } from "@repo/types";

import { LayoutList } from "lucide-react";
import { useState } from "react";

const DetailDialog = ({ data }: { data: StoreAddressTypes }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"} onClick={() => setIsOpen(true)}>
          <LayoutList /> Detail
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Store Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="font-semibold">Seller Name</h5>
            <p className=" capitalize">{data.name}</p>
          </div>
          <div>
            <h5 className="font-semibold">Seller Contact</h5>
            <p className=" capitalize">{data.contact}</p>
          </div>
          <div className="col-span-2">
            <h5 className="font-semibold">Address</h5>
            <p className=" capitalize">{data.address}</p>
          </div>
          <div className="">
            <h5 className="font-semibold">City</h5>
            <p className=" capitalize">{data.city}</p>
          </div>
          <div className="">
            <h5 className="font-semibold">State</h5>
            <p className=" capitalize">{data.state}</p>
          </div>
          <div className="">
            <h5 className="font-semibold">Pin Code</h5>
            <p className=" capitalize">{data.pincode}</p>
          </div>
          <div className="">
            <h5 className="font-semibold">Landmark</h5>
            <p className=" capitalize">{data.landmark}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
