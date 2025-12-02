import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductType } from "@repo/types";

const DeleteProduct = ({ pdata, id }: { pdata: ProductType; id: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteAllImages = async () => {
    const publicIds = pdata?.variants?.flatMap((variant) =>
      variant?.prod_img?.map((img) => img?.publicId)
    );
    const { data } = await api.post("/api/v1/delete-all-image", {
      ids: publicIds,
    });
    return data;
  };

  const handleDeleteProduct = async ({ id }: { id: number }) => {
    setIsOpen(true);
    if (pdata?.variants.length > 0) {
      await deleteAllImages();
    }
    const { data: status } = await api.delete(
      `/api/v1/dashboard/delete-product/${id}`
    );
    return status;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteProduct,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(responseData?.message || "Product Deleted");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger onClick={() => setIsOpen(true)}>
        <div className="flex items-center gap-2 text-red-500">
          <Trash className="text-red-500" /> Delete
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => mutate({ id: id })}>
            {isPending && <Spinner />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
