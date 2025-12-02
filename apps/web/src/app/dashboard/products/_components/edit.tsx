"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductEditType } from "@repo/schema";
import { Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setIsOpen } from "store/slices/dialogSlice";
import EditProductForm from "./edit-form";

export function EditProduct({
  data,
  pid,
}: {
  data: ProductEditType;
  pid: number;
}) {
  const isOpen = useAppSelector((state) => state.dialog.isOpen);
  const dispatch = useAppDispatch();

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(setIsOpen(!isOpen))}>
      <DialogTrigger asChild>
        <div
          className="flex items-center gap-2 cursor-pointer w-full"
          onClick={() => dispatch(setIsOpen(true))}>
          <Pencil /> Edit
        </div>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <EditProductForm data={data} pid={pid} />
      </DialogContent>
    </Dialog>
  );
}
