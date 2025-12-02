"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductResponseType } from "@repo/types";
import { Pencil, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setIsOpen } from "store/slices/dialogSlice";
import EditVariantForm from "./variant-form";
import { toast } from "sonner";

export function CreateVariant({
  variant,
  pid,
}: {
  variant?: ProductResponseType;
  pid: number;
}) {
  const isOpen = useAppSelector((state) => state.dialog.isOpen);
  const images = useAppSelector((state) => state.image);
  const dispatch = useAppDispatch();

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(setIsOpen(!isOpen))}>
      <DialogTrigger asChild>
        {variant ? (
          <div
            className="flex items-center gap-2 cursor-pointer w-full"
            onClick={() => dispatch(setIsOpen(true))}>
            <Pencil /> Edit
          </div>
        ) : (
          <Button type="button" onClick={() => dispatch(setIsOpen(true))}>
            <Plus /> Add Variant
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="w-full"
        onPointerDownOutside={(e) => {
          if (images.length > 0 && !variant) {
            e.preventDefault(); // This stops the dialog from closing
            toast.warning("Please save or discard your changes first.");
          }
        }}
        onEscapeKeyDown={(e) => {
          if (images.length > 0 && !variant) {
            e.preventDefault(); // This stops the dialog from closing
            toast.warning("Please save or discard your changes first.");
          }
        }}>
        <DialogHeader>
          <DialogTitle>{variant ? "Edit Variant" : "Add Variant"}</DialogTitle>
        </DialogHeader>

        <EditVariantForm pid={pid} variant={variant} />
      </DialogContent>
    </Dialog>
  );
}
